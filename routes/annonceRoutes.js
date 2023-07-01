const multer = require('multer');
const path = require('path');

const express = require('express');
const router = express.Router();
const annonceController = require('../controllers/annonceController');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Specify the directory to save the uploaded files
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName); // Set the file name to a unique value (e.g., timestamp + original file name)
  },
});

// Create the multer upload instance
const upload = multer({ storage });


// ...

// Route to add a new annonce with file upload
router.post('/', upload.single('pdfFile'), annonceController.addAnnonce);

// ...
router.get('/annonces', annonceController.getAnnonces);

module.exports = router;
