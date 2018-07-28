const mongoose = require('mongoose');
const promisify = require('es6-promisify');

const User = mongoose.model('User');

// RegisterForm
exports.registerForm = (req, res) => {
  res.render('register', { title: 'S\'inscrire' });
};

// LoginForm
exports.loginForm = (req, res) => {
  res.render('login', { title: 'Se Connecter' });
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
// getMentorCourse
// exports.getMentorCourse = (req, res, next) => {
//   const user = new User({
//     name: req.body.name,
//     email: req.body.email,
//   });
//   user.save(() => {
//     const course = new Course({ date: new Date(), mentor: user._id });
//     course.save(() => {
//       user.course.push(course);
//       user.save();
//       console.log(user + "blablabla");
//     });
//   });
// };

// Register
exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  const register = promisify(User.register, User); // on enregistre ds la bdd
  await register(user, req.body.password); // le pluggin passport(ds usermodel) nous fournit
  // la méthode register que nous transformons en promesse
  next();
};

// Become mentor
exports.registerMentor = async (req, res, next) => {
  // if logged -> get connected user -> isMentor = true
  if (req.user) {
    req.user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $set: { isMentor: true, description: req.body.description } },
      { new: true, runValidators: true, context: 'query' },
    );
  } else {
  // else -> create a new user -> isMentor = true
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      description: req.body.description,
      isMentor: true,
    });

    const register = promisify(User.register, User); // on enregistre ds la bdd
    await register(user, req.body.password); // le pluggin passport(ds usermodel) nous fournit
    // la méthode register que nous transformons en promesse
  }

  res.redirect('/');
};

// ProfileAccount user
exports.account = (req, res) => {
  res.render('profileAccount', { title: 'Mon compte' });
};


// update userAccount
exports.updateAccount = async (req, res) => {
  // ce q je veux update
  const updates = {
    name: req.body.name,
    email: req.body.email,
    course: req.body.course,
  };
  const user = await User.findOneAndUpdate(
    { _id: req.user._id }, // la query
    { $set: updates }, // ce q j'update
    { new: true, runValidators: true, context: 'query' }, // les options new pour la donnée mis á jr
  );
  req.flash('success', 'Votre profil a bien été mis á jour');
  res.redirect('profileAccount');
};
