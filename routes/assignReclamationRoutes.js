const express = require('express');
const router = express.Router();
const assignReclamationController = require('../controllers/assignReclamationController');



// Assign a reclamation to an agent mission
router.put('/:reclamationId/assign/:agentMId', assignReclamationController.assignReclamationToAgentM);

router.get('/assign-reclamation/:id', assignReclamationController.getAssignReclamationById);

router.get('/assignReclamations', assignReclamationController.getAllAssignReclamation);


module.exports = router;
