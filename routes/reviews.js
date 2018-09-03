const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

const reviewRouter = express.Router();

reviewRouter.post('/add/:id', authController.isLoggedIn, catchErrors(reviewController.addReview));

module.exports = reviewRouter;
