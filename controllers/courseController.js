const mongoose = require('mongoose');
const multer = require('multer');
const jimp = require('jimp'); // resizer mon img
const uuid = require('uuid'); // uniq identifier

const Course = mongoose.model('Course');

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

// 1-Upload
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
  await photo.resize(250, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  // console.log(req.file);
  next();
};

// GET LISTE COURS j'interroge ma base pour afficher tous les cours
exports.getCourses = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 6;
  const skip = (page * limit) - limit;

  const coursesPromise = Course
    .find()
    .skip(skip)
    .limit(limit);

  const countPromise = Course.count();

  const [courses, count] = await Promise.all([coursesPromise, countPromise]);
  const pages = Math.ceil(count / limit);
  if (!courses.length && skip) {
    req.flash('info', `Oups! Vous avez demandé la page ${page}. Mais elle n'existe pas. Vous allez être redirigé(e) sur la page ${pages}`);
    res.redirect(`/courses/page/${pages}`);
    return;
  }

  res.render('courses', {
    title: 'Reverse-Mentoring',
    courses,
    page,
    pages,
    count,
  });
  // console.log(courses);
  // res.json(courses);
};


// ADD A COURSE
exports.addCourse = (req, res) => {
  res.render('addnewcourse', { title: 'Ajouter Une Activité' });
};

// POSTER UN COURS (POST) Créer
exports.createCourse = async (req, res) => {
  req.body.mentor = req.user._id; // avant de créer un cours je m'assure q
  // l'id du mentor est bien le mm q celui du user
  const course = await (new Course(req.body)).save(); // Création d'une instance de Model
  req.flash('success', `Successfully Created ${course.name}`);
  res.redirect('/courses');
};

// function qui va me permettre une fois mon cours trouvé de confirmer que le mentor est bien celui de mon cours
const confirmOwner = (course, user) => {
  if (!course.mentor.equals(user._id)) {
    throw Error('You must own a course in order to edit it!');
  }
};

// EDITER UN COURS(GET)
exports.editCourse = async (req, res) => {
  const course = await Course.findOne({ _id: req.params.id });
  confirmOwner(course, req.user);
  res.render('editCourse', { title: `Edit ${course.name}`, course }); // À VOIR
};

// Mettre à jour dans la base(POST)
exports.updateCourse = async (req, res) => {
  const course = await Course.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true, // retourne le nouveau cours mis à jour
      runValidators: true, // force le model à exécuter les required qu'il contient
    },
  )
    .exec();
  req.flash('success', `Sucessfully updated ${course.name}. <a href="/courses/${course.slug}">Voir le Cours<a>`);
  res.redirect(`/courses/edit/${course._id}`);
};

// Find the course given the slug
exports.getCourseBySlug = async (req, res, next) => {
  const course = await Course.findOne({ slug: req.params.slug }).populate('mentor').populate('sessions');
  // res.json(course.mentor);
  if (!course) return next(); // middleware next me permet de passer à la suite et
  //  d'afficher un 404 si jms mon cours n'existe pas
  res.render('course', { course, title: course.name }); // course.mentor.name
  // res.json(course);
};

// find a course in the search input
exports.searchCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

// Get mentorCourse
