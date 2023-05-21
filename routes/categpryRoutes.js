const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Route to create a category
router.post('/', categoryController.createCategory);

router.get('/', categoryController.getAllCategories);

// Delete a category
router.delete('/:id', categoryController.deleteCategory);

// Update a category
router.put('/:id', categoryController.updateCategory);

module.exports = router;
