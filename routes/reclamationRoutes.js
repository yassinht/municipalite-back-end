const express = require('express');
const router = express.Router();
const reclamationController = require('../controllers/reclamationController');

// Create a new reclamation
router.post('/', reclamationController.createReclamation);


router.get('/', reclamationController.getAllReclamations);

router.get('/:id', reclamationController.getReclamationsById);



module.exports = router;
