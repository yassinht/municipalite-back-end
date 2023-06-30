const mongoose = require('mongoose');

const AgentMSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    photo: { type: String,  },
    adresse: { type: String, required: true },
    tel: { type: String, required: true },
    responsabilite: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number,  },

});

let AgentM = mongoose.model('agentM', AgentMSchema);

module.exports = { AgentM };
