const mongoose = require('mongoose');
const promisify = require('es6-promisify');

const User = mongoose.model('User');

// LoginForm
exports.loginForm = (req, res) => {
  res.render('login', { title: 'Se Connecter' });
};

// RegisterForm
exports.registerForm = (req, res) => {
  res.render('register', { title: 'Inscription' });
};

// MentorForm
exports.mentorForm = (req, res) => {
  res.render('mentorForm', { title: 'Je deviens mentor!' });
};
// middleware pour vérifier les données de mon formulaire

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name'); // sanitize me permet de formater mes données
  req.checkBody('name', 'Veuillez renseigner un nom').notEmpty(); // on vérifie que le champs name n'est pas vide
  req.checkBody('email', 'Cette adresse mail n\'est pas valide').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remode_subaddress: false,
  });
  req.checkBody('password', 'Mot de passe obligatoire').notEmpty();
  req.checkBody('password-confirm', 'Veuillez confirmer votre mot de passe').notEmpty();
  req.checkBody('password-confirm', 'Désolé ce mot de passe ne correspond pas').equals(req.body.password);

  const errors = req.validationErrors(); // va verifier toutes les métodes passées au-dessus
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    res.render('register', {
      title: 'Inscription',
      body: req.body,
      flashes: req.flash(),
    });
    return;
  }
  next(); // continuer vers l'inscription dans la bdd
};


// Register

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  const register = promisify(User.register, User);
  await register(user, req.body.password); // le pluggin passport(ds usermodel) nous fournit
  // la methode register que nous transformons en promesse
  next();
};

// Account user

exports.account = (req, res) => {
  res.render('account', { title: 'Mon compte' });
};
