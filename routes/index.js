const express = require('express');
const courseControllers = require('../controllers/course');
const { catchErrors } = require('../handlers/errorHandlers');

const router = express.Router();

router.get('/', catchErrors(courseControllers.getCourses));
router.get('/courses', courseControllers.getCourses);
router.get('/addcourse', courseControllers.addCourse);
router.post('/addcourse', catchErrors(courseControllers.createCourse));

module.exports = router;

