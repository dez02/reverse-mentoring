const passport = require('passport');
const mongoose = require('mongoose');
const promisify = require('es6-promisify');

const User = mongoose.model('User');


// Login
exports.login = passport.authenticate('local', {
  failureRedirect: '/user/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/', // á voir
  successFlash: 'Vous êtes maintenant connecté!',
});

// Logout
exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'Vous êtes déconnecté');
  res.redirect('/');
};

// Check if the user is logged in
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('Error', 'You must be logged in to do that!');
  res.redirect('/user/login');
};
