

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
global.atob = require("atob");
global.Blob = require('node-blob');
const { AgentB } = require('../models/agentB');
const { isValidObjectId } = require('mongoose');


let filename1 = [];







exports.createAgentB=   async (req, res) => {
  try {
    const agentB = new AgentB(req.body);
    await agentB.save();
    res.status(201).json(agentB);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
  exports.login =async (req, res) => {

    try {
      let agentBData = req.body
  
      let agentB = await AgentB.findOne({ email: agentBData.email })
  
      if (!agentB) {
        return res.status(404).send('Invalid Email')
      } else {
  
        const validPassword = bcrypt.compareSync(agentBData.password, agentB.password);
        console.log(validPassword)
  
        if (!validPassword) {
          res.status(404).send('Invalid Password')
          console.log(validPassword,agentBData.password, agentB.password)
        } else {
          let payload = { subject: agentB }
          let token = jwt.sign(payload, 'secretKey')
          return res.status(200).send({ token })
        }
      }
  
    } catch (error) {
      res.status(400).send({ message: "Erreur", error });
    }
  
  };


  exports.getAgentBById =  async (req, res) => {
    try {
      let id = req.params.id;
      if (!isValidObjectId(id)) {
        return res.status(404).send('not found')
      }
      let agentB = await AgentB.findOne({ _id: id, archived: false })
  
      if (!agentB) {
        res.status(404).send('not found')
      } else {
        res.status(200).send(agentB);
      }
    } catch (error) {
      res.status(400).send({ message: "Erreur", error });
    }
  };


  exports.GetAllAgentBs = async (req, res) => {
    try {
      let agentBs = await AgentB.find()
      res.status(200).send(agentBs);
    } catch (error) {
      res.status(400).send({ message: "Erreur", error });
    }
  };



  exports.updatedagentB = async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
  
      if (data.password) {
        const salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(data.password, salt);
      }
  
      const updatedagentB = await AgentB.findByIdAndUpdate(id, data, { new: true });
  
      if (!updatedagentB) {
        return res.status(404).send('AgentB not found');
      }
  
      const payload = { subject: updatedagentB };
      const token = jwt.sign(payload, 'secretKey');
  
      res.status(200).send({ message: 'AgentB updated successfully', token });
    } catch (error) {
      res.status(400).send({ message: 'Error updating agentB', error });
    }
  };
  
  
  
  
  exports.deleteById = async (req, res) => {
    try {
      let id = req.params.id;
  
      let agentB = await AgentB.findByIdAndDelete({ _id: id })
  
      if (!agentB) {
        res.status(404).send('not found')
      } else {
        res.status(200).send(agentB);
      }
    } catch (error) {
      res.status(400).send({ message: "Erreur", error });
    }
  };
  


 




