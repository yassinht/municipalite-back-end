const mongoose = require('mongoose');

const CitoyenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  adresse: { type: String, required: true },
  tel: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number, required: true },
});

const Citoyen = mongoose.model('Citoyen', CitoyenSchema);

module.exports = Citoyen;
