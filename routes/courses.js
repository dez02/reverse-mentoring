const express = require('express');
const courseController = require('../controllers/courseController');
const { catchErrors } = require('../handlers/errorHandlers');

const router = express.Router();
// courses
// router.get('/', catchErrors(courseController.getCourses));
router.get('/', courseController.getCourses); // afficher liste
router.get('/add', courseController.addCourse); // ajouter un cours
router.post('/add', catchErrors(courseController.createCourse)); // créer un cours
router.get('/edit/:id', catchErrors(courseController.editCourse)); // modifier un cours
router.post('/add/:id', catchErrors(courseController.updateCourse)); // trouver et à jour le cours dams la Bdd
router.get('/:slug', catchErrors(courseController.getCourseBySlug)); // trouver un cours via le slug(nom)

module.exports = router;
