const express = require('express');
const courseControllers = require('../controllers/course');

const router = express.Router();

router.get('/', courseControllers.courseList);
router.get('/addcourse', courseControllers.addCourse);
router.post('/addcourse', courseControllers.createCourse);

module.exports = router;

