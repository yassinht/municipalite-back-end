const mongoose = require('mongoose');

const CategoryReclamationSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const CategoryReclamation = mongoose.model('CategoryReclamation', CategoryReclamationSchema);

module.exports = CategoryReclamation;
