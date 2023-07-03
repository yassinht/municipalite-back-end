const mongoose = require('mongoose');

const ReclamationSchema = new mongoose.Schema({
  municipalite: { type: String, required: true },
  adresse: { type: String, required: true },
  status: { type: Boolean, required: true, default: false },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'categoryReclamation' },
  image: { type: String } // Add the "image" field of type String
}, {
  toJSON: {
    transform: function (doc, ret) {
      // Append the relative image path to the returned JSON object
      if (ret.image) {
        ret.image = `/images/${ret.image}`;
      }
    }
  }
});

ReclamationSchema.statics.findByIdAndUpdate = async function (id, update) {
  return this.findOneAndUpdate({ _id: id }, update, { new: true });
};

const Reclamation = mongoose.model('Reclamation', ReclamationSchema);

module.exports = Reclamation;
