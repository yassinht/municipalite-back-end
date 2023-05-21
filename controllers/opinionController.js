

const {Opinion}=require('../models/opinion')

exports.addOpinion = async (req, res) => {
    try {
      const { opinion, citoyenId, reclamationId } = req.body;
  
      // Create a new opinion
      const newOpinion = new Opinion({
        opinion: opinion,
        citoyen: citoyenId,
        reclamation: reclamationId,
      });
  
      // Save the opinion
      await newOpinion.save();
  
      res.status(200).send({ message: 'Opinion added successfully.' });
    } catch (error) {
      res.status(400).send({ message: 'Failed to add opinion.', error });
    }
  };



  exports.getOpinionsByReclamation = async (req, res) => {
    try {
      const { reclamationId } = req.params;
  
      // Find opinions by reclamation ID
      const opinions = await Opinion.find({ reclamation: reclamationId });
  
      res.status(200).send(opinions);
    } catch (error) {
      res.status(400).send({ message: 'Failed to get opinions for the reclamation.', error });
    }
  };

  // Get all opinions
exports.getAllOpinions = async (req, res) => {
  try {
    const opinions = await Opinion.find();
    res.status(200).send({ opinions });
  } catch (error) {
    res.status(400).send({ message: 'Error getting opinions.', error });
  }
};

// Get opinions by Citoyen ID
exports.getOpinionsByCitoyenId = async (req, res) => {
  try {
    const { citoyenId } = req.params;
    const opinions = await Opinion.find({ citoyen: citoyenId });
    res.status(200).send({ opinions });
  } catch (error) {
    res.status(400).send({ message: 'Error getting opinions by Citoyen ID.', error });
  }
};

// Delete an opinion
exports.deleteOpinion = async (req, res) => {
  try {
    const { opinionId } = req.params;
    const deletedOpinion = await Opinion.findByIdAndDelete(opinionId);
    if (!deletedOpinion) {
      res.status(404).send({ message: 'Opinion not found.' });
    } else {
      res.status(200).send({ message: 'Opinion deleted successfully.' });
    }
  } catch (error) {
    res.status(400).send({ message: 'Error deleting opinion.', error });
  }
};