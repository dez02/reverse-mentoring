const express = require('express');
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');
const authController = require('../controllers/authController');

const userRouter = express.Router();


// userLogin
userRouter.get('/login', userController.loginForm); // formulaire de connexion en get on récup le form
userRouter.post('/login', authController.login);

// Logout
userRouter.get('/logout', authController.logout);

// Register
userRouter.get('/inscription', userController.registerForm); // form inscription

userRouter.post('/inscription',
  userController.validateRegister,  // ici on valide d'abord le formulaire d'inscription
  userController.register,
  authController.login,
);
// UserAccount

userRouter.get('/account', userController.account);
// getMentorForm
// userRouter.get('/mentor', userController.mentorForm); // form d'inscrip mentor en get


module.exports = userRouter;
