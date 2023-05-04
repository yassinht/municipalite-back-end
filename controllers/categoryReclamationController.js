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
  