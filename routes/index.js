const express = require('express');
const courses = require('./courses');
const users = require('./users');

const router = express.Router();

router.use('/courses', courses); // devant toutes mes routes courses j'aurai
// /courses
router.use('/user', users); // pareil pour users


router.get('/', (req, res) => {
  res.redirect('/user/login');
});

module.exports = router;

