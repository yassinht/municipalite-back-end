const mongoose = require('mongoose');

const ReclamationSchema = new mongoose.Schema({
  municipalite: { type: String, required: true },
  adresse: { type: String, required: true },
  status: { type: Boolean, required: true, default: false },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'categoryReclamation' },
  image: { type: String } // Add the "image" field of type String
});

const Reclamation = mongoose.model('reclamation', ReclamationSchema);

module.exports = { Reclamation };
