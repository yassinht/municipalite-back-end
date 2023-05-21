
const express = require('express');
const router = express.Router();
const confirmController = require('../controllers/confirmController');
const multer = require('multer'); // Import multer for handling file uploads
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for uploaded files

router.post('/', upload.single('photo'), confirmController.addConfirmation);

router.get('/reclamation/:reclamationId', confirmController.getConfirmationsByReclamation);
router.get('/agent-mission/:agentMissionId', confirmController.getConfirmationsByAgentMissionId);
router.put('/:confirmationId', upload.single('photo'), confirmController.updateConfirmation);

module.exports = router;
