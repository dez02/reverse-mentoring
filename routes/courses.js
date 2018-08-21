const express = require('express');
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');

const { catchErrors } = require('../handlers/errorHandlers');

const courseRouter = express.Router();

// afficher liste des activités
courseRouter.get('/', catchErrors(courseController.getCourses));
courseRouter.get('/page/:page', catchErrors(courseController.getCourses));

// ajouter une activité
courseRouter.get('/add', authController.isLoggedIn, courseController.addCourse);

// créer une activité
courseRouter.post('/add',
  courseController.upload,
  catchErrors(courseController.resize),
  catchErrors(courseController.createCourse),
);

// modifier une activité
courseRouter.get('/edit/:id', catchErrors(courseController.editCourse));

// trouver et mettre à jour l'activité dans la Bdd
courseRouter.post('/add/:id',
  courseController.upload,
  catchErrors(courseController.resize),
  catchErrors(courseController.updateCourse));

// trouver une activité via le slug(nom)
courseRouter.get('/:slug', catchErrors(courseController.getCourseBySlug));

// Rechercher un cours dans la barre de recherche front
courseRouter.get('/api/search', catchErrors(courseController.searchCourses));

// Obtenir la liste des cours d'un mentor
// courseRouter.get('/:id_mentor', catchErrors(courseController.getCourseMentorId));

module.exports = courseRouter;
