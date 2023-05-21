const mongoose = require('mongoose');

const ConfirmedReclamationSchema = new mongoose.Schema({
  reclamation: { type: mongoose.Schema.Types.ObjectId, ref: 'Reclamation' },
  assignedReclamation: { type: mongoose.Schema.Types.ObjectId, ref: 'AssignReclamation' },
  text: { type: String, required: true },
  photo: { type: String, required: true },
});

const ConfirmedReclamation = mongoose.model('ConfirmedReclamation', ConfirmedReclamationSchema);

module.exports = ConfirmedReclamation;
