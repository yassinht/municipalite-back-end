const express = require('express');
const multer = require('multer');

global.atob = require("atob");
global.Blob = require('node-blob');

const { verifyToken } = require('../middlewares/verifyToken');
const agentMController=require('../controllers/agentMController')


let filename1 = [];
///secret key

const router = express.Router();

const storage = multer.diskStorage(
  {
    destination: './upload',
    filename: function (req, file, cb) {
      date = Date.now();
      cb(null, date + '.' + file.mimetype.split('/')[1]);
      let fl = date + '.' + file.mimetype.split('/')[1];
      filename1.push(fl);
    },
  }
);

const upload = multer({ storage: storage });


router.post('/', agentMController.createAgentM);

router.post('/login', agentMController.login);

router.get('/:id', agentMController.getById);

router.get('/responsabilty/:categoryId', agentMController.getByResponsabilite);

router.get('/', agentMController.getAll);

router.put('/:id', agentMController.updatedagentM);


router.delete('/:id', agentMController.deleteById);





module.exports = router;