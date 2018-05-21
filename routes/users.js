const express = require('express');
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');
const userRouter = express.Router();

// userLogin
userRouter.get('/login', userController.loginForm);
userRouter.get('/inscription', userController.registerForm);
userRouter.post('/inscription', userController.validateRegister);


module.exports = userRouter;
