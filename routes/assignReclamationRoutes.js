const express = require('express');
const router = express.Router();
const assignReclamationController = require('../controllers/assignReclamationController');



// Assign a reclamation to an agent mission
router.put('/:reclamationId/assign/:agentMId', assignReclamationController.assignReclamationToAgentM);

router.get('/assignReclamation/agentM/:agentM', assignReclamationController.getAssignReclamationByAgentM);

router.get('/assignReclamations', assignReclamationController.getAllAssignReclamation);

router.post('/confirmReclamation', assignReclamationController.confirmReclamation);

module.exports = router;
