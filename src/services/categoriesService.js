const { Category } = require('../models');
const validateCategoryFields = require('./validations/validateCategoryFields');

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return { type: 200, result: categories };
};

const createCategory = async (category) => {
  const error = validateCategoryFields(category);
  if (error.type) return error;

  const { name } = category;
  const { id } = await Category.create(name);
  
  return { type: 201, result: { id, name } };
};

module.exports = {
  getAllCategories,
  createCategory,
};
