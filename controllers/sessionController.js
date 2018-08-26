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
  // TODO vérifier que l'utilisateur est connecté, et si la session est disponible => mentoree === null
  await Session.findOneAndUpdate(
    { _id: req.params.idSession }, // je récup la session
    { $set: { mentoree: req.user } },
  ).exec();

  // todo flash pour dire qu'une inscription est prise en compte
  req.flash('success', 'Votre inscription a bien été prise en compte');
  res.redirect('/');
};

exports.cancelSession = async (req, res) => {
  // TODO Securiser l'accès si mentoree === userConnected
  await Session.findOneAndUpdate(
    { _id: req.params.idSession },
    { $unset: { mentoree: req.user } },
  ).exec();

  res.json();
};

// icone  button add
// icone remove
