const express = require('express');
const courses = require('./courses');
const users = require('./users');
const sessions = require('./sessions');
const reviews = require('./reviews');

const router = express.Router();

router.use('/courses', courses); // devant toutes mes routes courses j'aurai /courses

router.use('/user', users); // pareil pour users

router.use('/sessions', sessions);

router.use('/reviews', reviews);

router.get('/', (req, res) => {
  res.redirect('/courses');
});

module.exports = router;

