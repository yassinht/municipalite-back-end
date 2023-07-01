
const Annonce = require('../models/annonce');



// Function to add an annonce with file upload
exports.addAnnonce = async (req, res) => {
    try {
      const { title } = req.body;
  
      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      const pdfFile = req.file.path; // Get the path to the uploaded file
  
      const annonce = new Annonce({ title, pdfFile });
  
      const savedAnnonce = await annonce.save();
      res.status(201).json(savedAnnonce);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  


  // Function to get all annonces
exports.getAnnonces = async (req, res) => {
    try {
      const annonces = await Annonce.find();
      res.status(200).json(annonces);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  