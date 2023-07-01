const { Reclamation } = require('../models/reclamation');
const path = require('path');


exports.createReclamation = async (req, res) => {
  try {
    const { municipalite, adresse, category, status } = req.body;
    const { filename } = req.file; // Get the filename of the uploaded photo

    const reclamation = new Reclamation({
      municipalite,
      adresse,
      status,
      category,
      image: filename // Set the filename in the image field
    });

    await reclamation.save();

    // Construct the image URL to send back in the response
    const imageURL = `/images/${filename}`;

    res.status(201).send({ message: 'Reclamation created successfully.', imageURL });
  } catch (error) {
    res.status(400).send({ message: 'Error creating reclamation.', error });
  }
};


exports.getAllReclamations = async (req, res) => {
    try {
      const reclamations = await Reclamation.find();
      res.status(200).send({ reclamations });
    } catch (error) {
      res.status(400).send({ message: 'Error getting reclamations.', error });
    }
  };
  exports.getReclamationById = async (req, res) => {
    try {
      const { id } = req.params;
      const trimmedId = id.trim(); // Remove leading/trailing whitespace or newline characters
      const reclamation = await Reclamation.findById(trimmedId);
      if (!reclamation) {
        return res.status(404).send({ message: 'Reclamation not found.' });
      }
      return res.status(200).send({ reclamation });
    } catch (error) {
      return res.status(400).send({ message: 'Error getting reclamation.', error });
    }
  };
  
  

  

    // Update a reclamation
exports.updateReclamation = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID of the reclamation from the request URL
    const { municipalite, adresse, category, status } = req.body;
    const { filename } = req.file; // Get the filename of the uploaded photo

    // Find the reclamation by ID
    const reclamation = await Reclamation.findById(id);

    if (!reclamation) {
      return res.status(404).send({ message: 'Reclamation not found.' });
    }

    // Update the reclamation fields
    reclamation.municipalite = municipalite;
    reclamation.adresse = adresse;
    reclamation.category = category;
    reclamation.status = status;
    reclamation.image = filename;

    await reclamation.save();

    res.status(200).send({ message: 'Reclamation updated successfully.' });
  } catch (error) {
    res.status(400).send({ message: 'Error updating reclamation.', error });
  }
};


exports.serveImageByReclamationId = async (req, res) => {
  try {
    const { reclamationId } = req.params;

    const reclamation = await Reclamation.findById(reclamationId);
    if (!reclamation || !reclamation.image) {
      return res.status(404).send({ message: 'Reclamation or image not found.' });
    }

    const imagePath = path.join(__dirname, '../uploads', reclamation.image);

    res.sendFile(imagePath);
  } catch (error) {
    res.status(400).send({ message: 'Error serving image.', error });
  }
};