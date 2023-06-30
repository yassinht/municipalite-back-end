const CategoryReclamation = require('../models/categoryReclamation');

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await CategoryReclamation.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create category', error });
  }
};


exports.getCategoryRec = async (req, res) => {
    try {
      const categories = await CategoryReclamation.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create category', error });
    }
  };



    // Delete a category
exports.deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await CategoryReclamation.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).send('Category not found');
    }

    res.status(200).send('Category deleted successfully');
  } catch (error) {
    next(error);
  }
};

// Update a category
exports.updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const updatedData = req.body;

    const updatedCategory = await CategoryReclamation.findByIdAndUpdate(
      categoryId,
      updatedData,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).send('Category not found');
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};
  