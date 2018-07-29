const mongoose = require('mongoose');

const Session = mongoose.model('Session');
const Course = mongoose.model('Course');

exports.createSessionForm = (req, res) => {
  res.render('sessionForm', { title: 'Sessions', 'idCours': req.params.idCours });
};

exports.addSession = async (req, res) => {
  const session = new Session({
    date: req.body.date,
  });

  const course = await Course.findOneAndUpdate(
    { _id: req.params.idCours },
    { $push: { sessions: session } },
  );

  session.course = course;
  await session.save();

  res.redirect('/user/account');
};
