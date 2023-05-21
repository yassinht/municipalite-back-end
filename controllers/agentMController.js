const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
global.atob = require("atob");
global.Blob = require('node-blob');
const { AgentM } = require('../models/agentM');
const { AgentB } = require('../models/agentB');
const { isValidObjectId } = require('mongoose');


let filename1 = [];
///secret key







exports.createAgentM=  async (req, res) => {
    try {
      let obj = req.body;
      let agentM = new AgentM(obj);
  
  
      let findEmailInAgentB = await AgentB.findOne({ email: agentM.email })
      let findEmailInAgentM = await AgentM.findOne({ email: agentM.email })
  
  
      if (!findEmailInAgentB && !findEmailInAgentM) {
  
        try {
          const salt = bcrypt.genSaltSync(10);
          // now we set user password to hashed password
          agentM.password = bcrypt.hashSync(agentM.password, salt);
  
          filename1[0] ? agentM.photo = filename1[0] : agentM.photo = 'default.png';
          agentM.account_state = true;
          agentM.archived = false;
          agentM.added_date = new Date();
  
  
          let savedagentM = await agentM.save()
          filename1 = []
  
          if (!savedagentM) {
            res.status(404).send('not found')
          } else {
            res.status(200).send(savedagentM);
          }
        } catch (error) {
          console.log(error);
          res.status(400).send({ message: "Erreur", error });
        }
  
  
      } else {
        res.status(404).send('email invalid')
      }
  
  
    } catch (error) {
      res.status(400).send({ message: "Erreur", error });
    }
  };

  exports.login =  async (req, res) => {
    try {
      let agentMData = req.body
  
      let agentM = await AgentM.findOne({ email: agentMData.email })
  
      if (!agentM) {
        res.status(401).send('Invalid Email')
      }
      else {
        const validPassword = bcrypt.compareSync(agentMData.password, agentM.password);
        if (!validPassword) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = { subject: agentM }
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({ token })
        }
      }
  
    } catch (error) {
      res.status(400).send({ message: "Erreur", error });
    }
  };

  exports.getById = async (req, res) => {
    try {
      let id = req.params.id;
      if (!isValidObjectId(id)) {
        return res.status(404).send('not found')
      }
      let agentM = await AgentM.findOne({ _id: id, archived: false })
      if (!agentM) {
        return res.status(404).send({ message: "Not found" })
      }
      else {
        res.status(200).send(agentM);
      }
    } catch (error) {
      res.status(400).send({ message: "Erreur", error });
    }
  }


  exports.getAll = async (req, res) => {
    try {
      let agentMs = await AgentM.find()
      res.status(200).send(agentMs);
    } catch (error) {
      res.status(400).send({ message: "Erreur", error });
    }
  };
  


  exports.updatedagentM = async (req, res) => {
    try {
      let id = req.params.id;
      let data = req.body
  
      data.password ? data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10)) : delete data.password
  
      let updatedagentM = await AgentM.findByIdAndUpdate({ _id: id }, data, { new: true })
  
      if (!updatedagentM) {
        return res.status(404).send({ message: "Not found" })
      } else {
        let payload = { subject: updatedagentM }
        let token = jwt.sign(payload, 'secretKey')
        return res.status(200).send({ token });
      }
  
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: "Erreur", error });
    }
  };


  exports.deleteById =  async (req, res) => {
    try {
      let id = req.params.id;
  
      let agentM = await AgentM.findByIdAndDelete({ _id: id })
      if (!agentM) {
        res.status(404).send({ message: "Not found" })
      }
      else {
        res.status(200).send(agentM);
      }
    } catch (error) {
      res.status(400).send({ message: "Erreur", error });
    }
  };










