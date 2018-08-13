const mongoose = require('mongoose');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const promisify = require('es6-promisify');
const moment = require('moment');

const Course = mongoose.model('Course');
const User = mongoose.model('User');


// RegisterForm
exports.registerForm = (req, res) => {
  res.render('registerForm', { title: 'S\'inscrire' });
};

// LoginForm
exports.loginForm = (req, res) => {
  res.render('loginForm', { title: 'Se Connecter' });
};

// MentorForm
exports.mentorForm = (req, res) => {
  // TODO get user connected
  res.render('mentorForm', {
    title: 'Je deviens mentor!',
  });
};

// middleware pour vérifier les données de mon formulaire
exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name'); // sanitize me permet de formater mes données
  req.checkBody('name', 'Veuillez renseigner un nom').notEmpty(); // on vérifie que le champs name n'est pas vide
  req.checkBody('email', 'Cette adresse mail n\'est pas valide').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remode_subaddress: false,
  });
  req.checkBody('password', 'Mot de passe obligatoire').notEmpty();
  req.checkBody('password-confirm', 'Veuillez confirmer votre mot de passe').notEmpty();
  req.checkBody('password-confirm', 'Désolé ce mot de passe ne correspond pas').equals(req.body.password);

  const errors = req.validationErrors(); // va vérifier toutes les méthodes passées au-dessus
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    res.render('register', {
      title: 'Inscription',
      body: req.body,
      flashes: req.flash(),
    });
    return;
  }
  next(); // continuer vers l'inscription dans la bdd
};

// Register
exports.userRegister = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  const register = promisify(User.register, User); // on enregistre ds la bdd
  await register(user, req.body.password); // le pluggin passport(ds usermodel) nous fournit
  // la méthode register que nous transformons en promesse
  console.log(user);
  next();
};

// Upload d'images
const multerOptions = {
  storage: multer.memoryStorage(), // lieu de stockage
  fileFilter(req, file, next) { // type de fichier que j'autorise
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "That filetype isn't allowed" }, false);
    }
  },
};

// 1-UPLOAD
exports.upload = multer(multerOptions).single('photo');
// cette function me permet de stocker temporairemm des photos sur mon server et non sur mon disk

exports.resize = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;

  // et lá on size
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(140, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  console.log(req.body.photo);
  // console.log(req.file);
  next();
};

// Become mentor
exports.registerMentor = async (req, res, next) => {
  // if logged -> get connected user -> isMentor = true
  if (req.user) {
    req.user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $set: { isMentor: true, description: req.body.description, photo: req.body.photo } },
      { new: true, runValidators: true, context: 'query' },
    );
  } else {
  // else -> create a new user -> isMentor = true
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      description: req.body.description,
      isMentor: true,
      photo: req.body.photo,
    });

    const register = promisify(User.register, User); // on enregistre le user ds la bdd
    await register(user, req.body.password); // le pluggin passport(ds usermodel) nous fournit
    // la méthode register que nous transformons en promesse
  }

  res.redirect('/');
};

// ProfileAccount user
exports.account = async (req, res) => {
  const courses = await Course.find({ mentor: req.user }).populate('sessions');
  // courses = courses.map((course) => {
  //   course.session = course.sessions.map((session) => {
  //     session.date = moment(session.date).format('LLLL');
  //     return session;
  //   });
  //   return course;
  // });
  res.render('profileAccount', { title: 'Mon compte', courses });
};

exports.accountAnotherOne = async (req, res) => {
  if (req.user && req.user._id.equals(req.params.id)) {
    res.redirect('/user/account');
  }
  const mentor = await User.findById(req.params.id);
  const courses = await Course.find({ mentor: req.params.id }).populate('sessions');
  // courses = courses.map((course) => {
  //   const sessions = course.sessions.map((session) => {
  //     const date = moment(session.date, moment.ISO_8601).format('YYYY/MM/DD');
  //     return Object.assign({}, session, {
  //       date,
  //     });
  //   });
  //   return Object.assign({}, course, {
  //     sessions,
  //   });
  // });

  // console.log(courses);

  // console.log(courses[0].sessions[0]);

  res.render('profileAccountNotMe',
    {
      title: 'Le profile de $User',
      courses,
      mentor,
    },
  );
};

exports.editProfil = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  res.render('formProfil', { title: 'Éditer votre profil' });
};


// update userAccount
exports.updateAccount = async (req, res) => {
  // ce q je veux update
  console.log(req.body);

  const updates = {
    name: req.body.name,
    description: req.body.description,
    photo: req.body.photo,
  };
  req.user = await User.findOneAndUpdate(
    { _id: req.user._id }, // la query
    { $set: updates }, // ce q j'update
    { new: true, runValidators: true, context: 'query' }, // les options new pour la donnée mis á jr
  );
  console.log(req.user);

  req.flash('success', 'Votre profil a bien été mis à jour');
  res.redirect('/user/account');
};
