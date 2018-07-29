const express = require('express');
const { catchErrors } = require('../handlers/errorHandlers');
const sessionControllers = require('../controllers/sessionController');

const sessionRouter = express.Router();

sessionRouter.get('/form/:idCours', sessionControllers.createSessionForm);
sessionRouter.post('/form/:idCours', catchErrors(sessionControllers.addSession));

module.exports = sessionRouter;
