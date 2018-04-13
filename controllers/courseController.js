const mongoose = require('mongoose');

const Course = mongoose.model('Course');

// Affiche tous les cours
exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  res.render('courses', { title: 'Popular Web Programming Topics', courses });
};

// Ajouter un cours
exports.addCourse = (req, res) => {
  res.render('courseAdd', { title: 'Ajouter Un Cours' });
};

// Poster un cours
exports.createCourse = async (req, res) => {
  const course = await (new Course(req.body)).save();
  req.flash('success', `Sucessfully Created ${course.name}`);
  res.redirect('/courses');
};

// Editer un cours(GET)
exports.editCourse = async (req, res) => {
  const course = await Course.findOne({ _id: req.params.id });
  res.render('editCourse', { title: `Edit ${course.name}`, course }); // À VOIR
};

// Mettre à jour dans la base(POST)
exports.updateCourse = async (req,res) => {
  const course = await Course.findOneAndUpdate({ _id: req.params.id }, req.body,
    {
      new: true, // retourne le nouveau cours mis à jour
      runValidators: true // force le model à exécuter les require qu'il contient
 }).exec();
 req.flash('Success', `Sucessfully updated ${course.name}. <a href="/courses/${course.slug}">Voir le Cours<a>`);
 res.redirect(`/courses/edit/${course._id}`);
};
// FindOneAndUpdate prends 3 paramètes:
//- la requête
//-les datas ce qu'on veut updater cád dire les datas que l'on passe dans le body
//-les options

// Find the course given the slug
exports.getCourseBySlug = async (req, res, next) => {
  const course = await Course.findOne({ slug: req.params.slug });
  if (!course) return next(); // middleware next me permet de passer à la suite et  d'afficher un 404 si jms mon cours n'existe pas
  res.render('course',  { course, title: course.name });
};
