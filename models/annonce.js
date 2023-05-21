const mongoose = require('mongoose');

const AnnonceSchema = new mongoose.Schema({
  sujet: { type: String, required: true },
});

const Annonce = mongoose.model('Annonce', AnnonceSchema);

module.exports = Annonce;
