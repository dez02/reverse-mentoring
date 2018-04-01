exports.courseList = (req, res) => {
  res.render('courseList');
};

exports.addCourse = (req, res) => {
  res.render('addCourse', { title: 'Ajouter Un Cours' });
};

exports.createCourse = (req, res) => {
  res.json(req.body);
};
