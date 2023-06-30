const express = require('express');
const router = express.Router();
const categoryReclamationController = require('../controllers/categoryReclamationController');

// Create a new category
router.post('/', categoryReclamationController.createCategory);

router.get('/', categoryReclamationController.getCategoryRec);

// Delete a category
router.delete('/:id', categoryReclamationController.deleteCategory);

// Update a category
router.put('/:id', categoryReclamationController.updateCategory);

module.exports = router;
