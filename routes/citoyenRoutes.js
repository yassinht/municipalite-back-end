const express = require('express');
const router = express.Router();
const citoyenController = require('../controllers/citoyenController');

router.post('/', citoyenController.createCitoyen);
router.post('/login', citoyenController.login);

router.get('/', citoyenController.getAllCitoyens);

router.post('/:id', citoyenController.getCitoyenById);

module.exports = router;
