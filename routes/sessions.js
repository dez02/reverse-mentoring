const express = require('express');
const { catchErrors } = require('../handlers/errorHandlers');
const sessionControllers = require('../controllers/sessionController');

const sessionRouter = express.Router();

sessionRouter.get('/form/:idCours', sessionControllers.createSessionForm);
sessionRouter.post('/form/:idCours', catchErrors(sessionControllers.addSession));

sessionRouter.post('/:idSession', sessionControllers.supplySession);
sessionRouter.delete('/:idSession', sessionControllers.cancelSession);


module.exports = sessionRouter;
