const express = require('express');
const router = express.Router();
const reclamationController = require('../controllers/reclamationController');
const multer = require('multer'); // Import multer for handling file uploads
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for uploaded files

// Create a new reclamation
router.post('/', upload.single('image'), reclamationController.createReclamation);


router.get('/', reclamationController.getAllReclamations);

router.get('/:id', reclamationController.getReclamationById);
// Update a reclamation
router.put('/:id', upload.single('image'), reclamationController.updateReclamation);



module.exports = router;
