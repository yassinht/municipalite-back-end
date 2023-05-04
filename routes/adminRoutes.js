const express = require('express');
global.atob = require("atob");
global.Blob = require('node-blob');
const router = express.Router();


const adminController=require('../controllers/adminController')


router.post('/', adminController.createAdmin);

router.post('/login', adminController.login);

module.exports = router;