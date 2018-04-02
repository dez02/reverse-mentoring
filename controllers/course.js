const mongoose = require('mongoose');

const Course = mongoose.model('Course');


exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  res.render('courses', { title: 'Courses', courses });
};

exports.addCourse = (req, res) => {
  res.render('addCourse', { title: 'Ajouter Un Cours' });
};

exports.createCourse = async (req, res) => {
  const course = await (new Course(req.body)).save();
  req.flash('success', `Sucessfully Created ${course.title}`);
  res.redirect(`/course/${course.slug}`);
};
