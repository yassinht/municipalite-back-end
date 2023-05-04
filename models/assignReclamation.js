const mongoose = require('mongoose');

const AssignReclamationSchema = new mongoose.Schema({
    reclamation: { type: mongoose.Schema.Types.ObjectId, ref: 'reclamation' },
  agentM: { type: mongoose.Schema.Types.ObjectId, ref: 'agentM' }
});

const AssignReclamation = mongoose.model('assignReclamation', AssignReclamationSchema);

module.exports = { AssignReclamation };
