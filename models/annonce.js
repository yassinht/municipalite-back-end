const mongoose = require('mongoose');

const annonceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dateAjout: { type: Date, default: Date.now },
  pdfFile: { type: String, required: true },
});

const Annonce = mongoose.model('Annonce', annonceSchema);

module.exports = Annonce;
