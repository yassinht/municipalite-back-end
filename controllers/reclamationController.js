const { Reclamation } = require('../models/reclamation');


exports.createReclamation = async (req, res) => {
  try {
    const { municipalite, adresse, categoryId } = req.body;
    const reclamation = new Reclamation({
      municipalite,
      adresse,
      category: categoryId
    });
    await reclamation.save();
    res.status(201).send({ message: 'Reclamation created successfully.' });
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
  
  exports.getReclamationsById = async (req, res) => {
    try {
      const { reclamationId } = req.params;
      const reclamation = await Reclamation.findById(reclamationId).populate('category');
      if (!reclamation) {
        res.status(404).send({ message: 'Reclamation not found.' });
      } else {
        res.status(200).send({ reclamation });
      }
    } catch (error) {
      res.status(400).send({ message: 'Error getting reclamation.', error });
    }};