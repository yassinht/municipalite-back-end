const Category = require('../models/category');

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

exports.getAllCategories = async (req, res, next) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  };

  // Delete a category
exports.deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

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

    const updatedCategory = await Category.findByIdAndUpdate(
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