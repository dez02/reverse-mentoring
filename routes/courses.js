const express = require('express');
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');

const { catchErrors } = require('../handlers/errorHandlers');

const courseRouter = express.Router();
// courses
// router.get('/', catchErrors(courseController.getCourses));
courseRouter.get('/', courseController.getCourses); // afficher liste des activités

courseRouter.get('/add', authController.isLoggedIn, courseController.addCourse); // ajouter une activité

courseRouter.post('/add',
  courseController.upload,
  catchErrors(courseController.resize),
  catchErrors(courseController.createCourse),
); // créer une activité

courseRouter.get('/edit/:id', catchErrors(courseController.editCourse)); // modifier une activité

courseRouter.post('/add/:id',
  courseController.upload,
  catchErrors(courseController.resize),
  catchErrors(courseController.updateCourse)); // trouver et mettre à jour l'activité dans la Bdd

courseRouter.get('/:slug', catchErrors(courseController.getCourseBySlug)); // trouver une activité via le slug(nom)

// courseRouter.get('/api/search', catchErrors(courseController.searchCourse));


module.exports = courseRouter;
