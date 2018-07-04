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

// Affiche tous les cours
exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  res.render('courses', { courses });
};

// Ajouter un cours
exports.addCourse = (req, res) => {
  res.render('courseAdd', { title: 'Ajouter Une Activité' });
};

// Upload
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
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  // console.log(req.file);
  next();
};

// Poster un cours (POST)
exports.createCourse = async (req, res) => {
  const course = await (new Course(req.body)).save();
  req.flash('success', `Successfully Created ${course.name}`);
  res.redirect('/courses');
};

// Editer un cours(GET)
exports.editCourse = async (req, res) => {
  const course = await Course.findOne({ _id: req.params.id });
  res.render('editCourse', { title: `Edit ${course.name}`, course }); // À VOIR
};

// Mettre à jour dans la base(POST)
exports.updateCourse = async (req, res) => {
  const course = await Course.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true, // retourne le nouveau cours mis à jour
      runValidators: true, // force le model à exécuter les require qu'il contient
    },
  )
    .exec();
  req.flash('Success', `Sucessfully updated ${course.name}. <a href="/courses/${course.slug}">Voir le Cours<a>`);
  res.redirect(`/courses/edit/${course._id}`);
};
// FindOneAndUpdate prends 3 paramètes:
// - la requête
// -les datas ce qu'on veut updater cád dire les datas que l'on passe dans le body
// -les options

// Find the course given the slug
exports.getCourseBySlug = async (req, res, next) => {
  const course = await Course.findOne({ slug: req.params.slug });
  if (!course) return next(); // middleware next me permet de passer à la suite et
  // d'afficher un 404 si jms mon cours n'existe pas
  res.render('course', { course, title: course.name });
};
