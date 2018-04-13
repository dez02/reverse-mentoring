const express = require('express');
const courseController = require('../controllers/courseController');
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');

const router = express.Router();
// courses
// router.get('/', catchErrors(courseController.getCourses));
router.get('/courses', courseController.getCourses); // afficher liste
router.get('/courses/add', courseController.addCourse); // ajouter un cours
router.post('/courses/add', catchErrors(courseController.createCourse)); // créer un cours
router.get('/courses/edit/:id', catchErrors(courseController.editCourse)); // modifier un cours
router.post('/courses/add/:id', catchErrors(courseController.updateCourse)); // trouver et à jour le cours dams la Bdd
router.get('/courses/:slug', catchErrors(courseController.getCourseBySlug)); // trouver un cours via le slug(nom)

//userLogin
router.get('/login', userController.loginForm);
router.get('/inscription', userController.registerForm);

module.exports = router;

