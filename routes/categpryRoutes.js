const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Route to create a category
router.post('/', categoryController.createCategory);

router.get('/', categoryController.getAllCategories);

module.exports = router;
