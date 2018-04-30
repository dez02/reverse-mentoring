const express = require('express');
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');
const router = express.Router();

//userLogin
router.get('/login', userController.loginForm);
router.get('/inscription', userController.registerForm);

module.exports = router;
