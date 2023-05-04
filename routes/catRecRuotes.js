const express = require('express');
const router = express.Router();
const categoryReclamationController = require('../controllers/categoryReclamationController');

// Create a new category
router.post('/', categoryReclamationController.createCategory);

router.get('/', categoryReclamationController.getCategoryRec);


module.exports = router;
