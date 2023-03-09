const categoriesService = require('../services/categoriesService');

const getAllCategories = async (req, res) => {
  const response = await categoriesService.getAllCategories();
  return res.status(response.type).json(response.result);
};

const createCategory = async (req, res) => {
  const response = await categoriesService.createCategory(req.body);
  return res.status(response.type).json(response.result);
};

module.exports = {
  getAllCategories,
  createCategory,
};