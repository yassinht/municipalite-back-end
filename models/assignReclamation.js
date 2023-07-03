const mongoose = require('mongoose');

const AssignReclamationSchema = new mongoose.Schema({
  reclamation: { type: mongoose.Schema.Types.ObjectId, ref: 'reclamation' },
  agentM: { type: mongoose.Schema.Types.ObjectId, ref: 'agentM' },
  agentB: { type: mongoose.Schema.Types.ObjectId, ref: 'agentB' },
  statusAR: { type: Boolean, required: true, default: false }
});

AssignReclamationSchema.statics.findByIdAndUpdate = async function (id, update) {
  return this.findOneAndUpdate({ _id: id }, update, { new: true });
};

const AssignReclamation = mongoose.model('AssignReclamation', AssignReclamationSchema);

module.exports = AssignReclamation;
