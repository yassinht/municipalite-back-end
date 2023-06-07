const mongoose = require('mongoose');

const AssignReclamationSchema = new mongoose.Schema({
    reclamation: { type: mongoose.Schema.Types.ObjectId, ref: 'reclamation' },
  agentM: { type: mongoose.Schema.Types.ObjectId, ref: 'agentM' },
  agentB: { type: mongoose.Schema.Types.ObjectId, ref: 'agentB' },

  statusAR:{type:Boolean,require:true,default:false}
});

const AssignReclamation = mongoose.model('assignReclamation', AssignReclamationSchema);

module.exports = { AssignReclamation };
