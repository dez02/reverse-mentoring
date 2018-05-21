const mongoose = require('mongoose');

// const User = mongoose.model('User');

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Se Connecter' });
};

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Inscription' });
};

// middleware pour vérifier les données de mon formulaire

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name'); // sanitize me permet de formater mes données
  req.checkBody('name', 'Veuillez renseigner un nom').notEmpty();
  req.checkBody('email', 'Cette adresse mail n\'est pas valide').isEmail();
  req.checkBody('password', 'Mot de passe obligatoire').notEmpty();
  req.checkBody('password-confirm', 'Veuillez confirmer votre mot de passe').notEmpty();
  req.checkBody('password-confirm', 'Désolé ce mot de passe ne correspond pas').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    res.render('register', {
      title: 'Inscription',
      body: req.body,
      flashes: req.flash(),
    });
  }
};

function newFunction(req) { // verifier dans le fichier github
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remode_subaddress: false,
  });
}

