const ConfirmedReclamation = require('../models/confirmRec');
const Reclamation = require('../models/reclamation');
const AssignReclamation = require('../models/assignReclamation');


exports.addConfirmation = async (req, res) => {
  try {
    const { reclamationId, assignedReclamationId, text } = req.body;
    const { filename } = req.file;

    const confirmation = new ConfirmedReclamation({
      reclamation: reclamationId,
      assignedReclamation: assignedReclamationId,
      text,
      photo: filename
    });

    await confirmation.save();

    await Reclamation.findByIdAndUpdate(reclamationId, { status: true });

    await AssignReclamation.findByIdAndUpdate(assignedReclamationId, { statusAR: true });

    res.status(201).send({ message: 'Confirmation added successfully.', confirmation });
  } catch (error) {
    console.log(error); // Log the error to the console
    res.status(400).send({ message: 'Failed to add confirmation.', error });
  }
};
  
exports.getConfirmationsByReclamation = async (req, res) => {
  try {
    const { reclamationId } = req.params;
    const confirmations = await ConfirmedReclamation.find({ reclamation: reclamationId })
      .populate('reclamation')
      .populate('assignedReclamation');

    if (confirmations.length === 0) {
      return res.status(404).send({ message: 'No confirmations found for the reclamation.' });
    }

    res.status(200).send({ confirmations });
  } catch (error) {
    res.status(400).send({ message: 'Error getting confirmations.', error });
  }
};
exports.getConfirmationsByAgentMissionId = async (req, res) => {
    try {
      const { agentMissionId } = req.params;
  
      const confirmations = await ConfirmedReclamation.find({ assignedReclamation: { $ne: null } })
        .populate({
          path: 'assignedReclamation',
          match: { agentM: agentMissionId },
          populate: {
            path: 'reclamation',
            model: 'Reclamation'
          }
        });
  
      if (confirmations.length === 0) {
        return res.status(404).send({ message: 'No confirmations found for the agent mission.' });
      }
  
      res.status(200).send({ confirmations });
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: 'Error getting confirmations.', error });
    }
  };
  
  
  
  
  
  
exports.updateConfirmation = async (req, res) => {
  try {
    const { confirmationId } = req.params;
    const { text } = req.body;
    const photo = req.file.filename;

    const confirmation = await ConfirmedReclamation.findByIdAndUpdate(
      confirmationId,
      { text, photo },
      { new: true }
    );

    if (!confirmation) {
      return res.status(404).send({ message: 'Confirmation not found.' });
    }

    res.status(200).send({ message: 'Confirmation updated successfully.', confirmation });
  } catch (error) {
    res.status(400).send({ message: 'Failed to update confirmation.', error });
  }
};
