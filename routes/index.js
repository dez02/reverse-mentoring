const express = require('express');
const courseController = require('../controllers/courseController');
const { catchErrors } = require('../handlers/errorHandlers');

const router = express.Router();

router.get('/', catchErrors(courseController.getCourses));
router.get('/courses', courseController.getCourses);
router.get('/addcourse', courseController.addCourse)
router.post('/addcourse', catchErrors(courseController.createCourse));
router.post('/addcourse/:id', catchErrors(courseController.updateCourse));
router.get('/courses/:id/edit', catchErrors(courseController.editCourse));
router.get('/course/:slug', catchErrors(courseController.getCourseBySlug));
module.exports = router;

