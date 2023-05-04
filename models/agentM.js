const mongoose = require('mongoose');

const AgentMSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    photo: { type: String, required: true },
    adresse: { type: String, required: true },
    tel: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  
})
let AgentM = mongoose.model('agentM', AgentMSchema);

module.exports = { AgentM };