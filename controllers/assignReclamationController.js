const { AgentM } = require('../models/agentM');
const { AssignReclamation } = require('../models/assignReclamation');
const { Reclamation } = require('../models/reclamation');



exports.assignReclamationToAgentM = async (req, res) => {
    try {
      const { reclamationId, agentMId } = req.params;
  
      const reclamation = await Reclamation.findById(reclamationId);
      if (!reclamation) {
        res.status(404).send({ message: 'Reclamation not found.' });
      }
  
      const agentM = await AgentM.findById(agentMId);
      if (!agentM) {
        res.status(404).send({ message: 'AgentM not found.' });
      }
  
      const assignReclamation = new AssignReclamation({
        reclamation: reclamationId,
        agentM: agentMId
      });
      await assignReclamation.save();
  
      // Update the status of the assigned reclamation to true
      await Reclamation.findByIdAndUpdate(reclamationId, { status: true });
  
      res.status(200).send({ message: 'Reclamation assigned to AgentM successfully.', reclamation });
    } catch (error) {
      res.status(400).send({ message: 'Error assigning reclamation to AgentM.', error });
    }
  };
  
  

  exports.getAllAssignReclamation = async (req, res) => {
    try {
      const assignReclamations = await AssignReclamation.find();
      res.status(200).send(assignReclamations);
    } catch (error) {
      res.status(400).send({ message: 'Failed to get assignReclamations.', error });
    }
  };

  exports.getAssignReclamationByAgentM = async (req, res) => {
   const idAgentM= req.params.agentM
   console.log(idAgentM)
    try {
      const assignReclamations = await AssignReclamation.find({ agentM: idAgentM })
        .populate('reclamation');
  
      if (!assignReclamations || assignReclamations.length === 0) {
        return res.status(404).send({ message: 'No AssignReclamations found for the agentM.' });
      }
  
    
      res.status(200).send(assignReclamations);
    } catch (error) {
      res.status(400).send({ message: 'Failed to get AssignReclamations for the agentM.', error });
    }
  };
  
  

  

  exports.confirmReclamation = async (req, res) => {
    try {
      const { photo, status } = req.body;
      const assignReclamation = await AssignReclamation.findById(req.params.id);
  
      if (!assignReclamation) {
        return res.status(404).send({ message: 'AssignReclamation not found.' });
      }
  
      // Update the assignReclamation with the provided photo and status
      assignReclamation.photo = photo;
      assignReclamation.status = status;
  
      // Save the updated assignReclamation
      await assignReclamation.save();
  
      res.status(200).send({ message: 'Reclamation confirmed successfully.', assignReclamation });
    } catch (error) {
      res.status(400).send({ message: 'Failed to confirm reclamation.', error });
    }
  };
  