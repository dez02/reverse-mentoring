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

  req.flash('success', 'Successfully Added');
  res.redirect('/user/account');
};

// S'inscrire à une session
exports.supplySession = async (req, res) => {
  // TODO verifier l utilisateur est connecter, et session est disponible => mentoree === null
  await Session.findOneAndUpdate(
    { _id: req.params.idSession },
    { $set: { mentoree: req.user } },
  ).exec();

  // todo flash pour dire ton inscription est pris en compte
  res.json();
};

exports.cancelSession = async (req, res) => {
  // TODO Securiser l'acces si mentoree === userConnected
  await Session.findOneAndUpdate(
    { _id: req.params.idSession },
    { $unset: { mentoree: req.user } },
  ).exec();

  res.json();
};


// // NE PEUT AJOUTER QUE LE MENTOR
