const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
global.atob = require("atob");
global.Blob = require('node-blob');
const { AgentM } = require('../models/agentM');
const { AgentB } = require('../models/agentB');
const { isValidObjectId } = require('mongoose');


let filename1 = [];
///secret key







exports.createAgentM = async (req, res) => {
  try {
    let obj = req.body;
    let agentM = new AgentM(obj);

    let findEmailInAgentM = await AgentM.findOne({ email: agentM.email });

    if (!findEmailInAgentM) {
      const salt = bcrypt.genSaltSync(10);
      agentM.password = bcrypt.hashSync(agentM.password, salt);
      agentM.photo = filename1[0] ? filename1[0] : 'default.png';
      
      let savedAgentM = await agentM.save();
      filename1 = [];

      if (!savedAgentM) {
        res.status(404).send('not found');
      } else {
        res.status(200).send(savedAgentM);
      }
    } else {
      res.status(400).send('email invalid');
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Erreur', error });
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
  exports.getByResponsabilite = async (req, res) => {
    try {
      const { categoryId } = req.params;
  
      const agentMs = await AgentM.find({ responsabilite: categoryId }).populate('responsabilite');
  
      res.status(200).send(agentMs);
    } catch (error) {
      res.status(400).send({ message: "Erreur", error });
    }
  };
  

  exports.getAll = async (req, res) => {
    try {
      let agentMs = await AgentM.find().populate('responsabilite');
      res.status(200).send(agentMs);
    } catch (error) {
      res.status(400).send({ message: "Erreur", error });
    }
  };
  

  exports.updatedagentM = async (req, res) => {
    try {
      let id = req.params.id;
      let data = req.body;
  
      if (data.password) {
        const salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(data.password, salt);
      } else {
        delete data.password;
      }
  
      let updatedagentM = await AgentM.findByIdAndUpdate({ _id: id }, data, { new: true });
  
      if (!updatedagentM) {
        return res.status(404).send({ message: "Not found" });
      } else {
        let payload = { subject: updatedagentM };
        let token = jwt.sign(payload, 'secretKey');
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










