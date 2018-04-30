const express = require('express');
const courses = require('./courses');
const users = require('./users');

const router = express.Router();

router.use('/courses', courses);
router.use('/user', users);


router.get('/', (req, res) => {
  res.redirect('user/login');
});

module.exports = router;

