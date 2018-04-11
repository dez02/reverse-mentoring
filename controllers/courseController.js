const mongoose = require('mongoose');

const Course = mongoose.model('Course');

// affiche tous les cours
exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  res.render('courses', { title: 'Popular Web Programming Topics', courses });
};

// ajouter un cours
exports.addCourse = (req, res) => {
  res.render('addCourse', { title: 'Ajouter Un Cours' });
};

// poster un cours
exports.createCourse = async (req, res) => {
  const course = await (new Course(req.body)).save();
  req.flash('success', `Sucessfully Created ${course.title}`);
  res.redirect(`/course/${course.slug}`);
};

// modifier un cours
exports.editCourse = async (req, res) => {
  const course = await Course.findOne({ _id: req.params.id });
  res.render('editCourse', { title: `Edit ${course.name}`, course });
};

// mettre à jour dans la base(post)
exports.updateCourse = async (req,res) => {
  const course = await Course.findOneAndUpdate({ _id: req.params.id }, req.body,
    {
      new: true,
      runValidators: true
 }).exec();
 req.flash('Success', `Sucessfully updated ${course.name}. <a href="/courses/${course.slug}">View Course<a>`);
 res.redirect(`/courses/${course._id}/edit`);
};

// slug
exports.getCourseBySlug = async (req, res, next) => {
  const course = await Course.findOne({ slug: req.params.slug });
  if (!course) return next(); // middleware next me permet de passer à la suite et  d'afficher un 404 si jms mon slug n'existe pas
  res.render('course',  { course, title: course.name });
};
