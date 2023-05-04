const { AgentM } = require('../models/agentM');
const { AssignReclamation } = require('../models/assignReclamation');


// exports.assignReclamationToAgentM = async (req, res) => {
//     try {
//       const { reclamationId, agentMId } = req.params;
  
//       const reclamation = await Reclamation.findById(reclamationId);
//       if (!reclamation) {
//         res.status(404).send({ message: 'Reclamation not found.' });
//       }
  
//       const agentM = await AgentM.findById(agentMId);
//       if (!agentM) {
//         res.status(404).send({ message: 'AgentM not found.' });
//       }
  
//       const assignReclamation = new AssignReclamation({
//         reclamation: reclamationId,
//         agentM: agentMId
//       });
//       await assignReclamation.save();
  
    
  
//       res.status(200).send({ message: 'Reclamation assigned to AgentM successfully.', reclamation });
//     } catch (error) {
//       res.status(400).send({ message: 'Error assigning reclamation to AgentM.', error });
//     }
//   };

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


  exports.getAssignReclamationById = async (req, res) => {
    try {
      const assignReclamation = await AssignReclamation.findById(req.params.id);
      if (!assignReclamation) {
        res.status(404).send({ message: 'AssignReclamation not found.' });
      } else {
        res.status(200).send(assignReclamation);
      }
    } catch (error) {
      res.status(400).send({ message: 'Failed to get assignReclamation.', error });
    }
  };
  