const mongoose = require('mongoose');

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Se Connecter' });
};

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Inscription'});
};

// middleware pour vérifier les données de mon formulaire

exports.validateRegister = (req,res,next) => {
  req.sanitizedBody
};


