const express = require('express');
const courseController = require('../controllers/courseController');
const { catchErrors } = require('../handlers/errorHandlers');

const courseRouter = express.Router();
// courses
// router.get('/', catchErrors(courseController.getCourses));
courseRouter.get('/', courseController.getCourses); // afficher liste
courseRouter.get('/add', courseController.addCourse); // ajouter un cours
courseRouter.post('/add', catchErrors(courseController.createCourse)); // créer un cours
courseRouter.get('/edit/:id', catchErrors(courseController.editCourse)); // modifier un cours
courseRouter.post('/add/:id', catchErrors(courseController.updateCourse)); // trouver et à jour le cours dams la Bdd
courseRouter.get('/:slug', catchErrors(courseController.getCourseBySlug)); // trouver un cours via le slug(nom)

module.exports = courseRouter;
