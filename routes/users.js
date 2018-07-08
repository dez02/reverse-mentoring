const express = require('express');
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');
const authController = require('../controllers/authController');

const userRouter = express.Router();


// GET userLogin
userRouter.get('/login', userController.loginForm); // formulaire de connexion en get on récup le form

// POST userLogin
userRouter.post('/login', authController.login);

// Logout
userRouter.get('/logout', authController.logout);

// GET Register
userRouter.get('/inscription', userController.registerForm); // form inscription

// POST Register
userRouter.post('/inscription',
  userController.validateRegister,  // ici on valide d'abord le formulaire d'inscription
  userController.register,
  authController.login,
);

// GET UserAccount
userRouter.get('/account', authController.isLoggedIn, userController.account); // on vérifie bien q le user est connecté

// POST userAccount
userRouter.post('/account', catchErrors(userController.updateAccount));


// getMentorForm
// userRouter.get('/mentors', userController.getMentorCourse);
userRouter.get('/mentor', userController.mentorForm); // form d'inscrip mentor en get


module.exports = userRouter;
