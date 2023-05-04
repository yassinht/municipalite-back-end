

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
global.atob = require("atob");
global.Blob = require('node-blob');
const { AgentB } = require('../models/agentB');
const { isValidObjectId } = require('mongoose');


let filename1 = [];







exports.createAgentB=   async (req, res) => {
    try {
      let obj = req.body;
      let agentB = new AgentB(obj);
  
  
      let findEmailInAgentB = await AgentB.findOne({ email: agentB.email })
  
  
      if (!findEmailInAgentB ) {
  
        try {
          const salt = bcrypt.genSaltSync(10);
          // now we set user password to hashed password
          agentB.password = bcrypt.hashSync(agentB.password, salt);
    
  
          let savedagentB = await agentB.save()
          filename1 = []
  
          if (!savedagentB) {
            return res.status(404).send('not found')
          } else {
            return res.status(200).send(savedagentB);
          }
        } catch (error) {
          return res.status(400).send({ message: "Erreur", error });
        }
  
  
      } else {
        return res.status(404).send('email invalid')
      }
  
  
    } catch (error) {
      return res.status(400).send({ message: "Erreur", error });
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
      let id = req.params.id;
      let data = req.body
  
      data.password ? data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10)) : delete data.password
  
      let updatedagentB = await AgentB.findByIdAndUpdate({ _id: id }, data, { new: true })
  
      if (!updatedagentB) {
        res.status(404).send('not found')
      } else {
        let payload = { subject: updatedagentB }
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({ token });
      }
  
    } catch (error) {
      res.status(400).send({ message: "Erreur", error });
    }
  };

  exports.deleteById =   async (req, res) => {
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
  


 




