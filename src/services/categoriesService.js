const { Category } = require('../models');
const validateCategoryFields = require('./validations/validateCategoryFields');

const createCategory = async (category) => {
  const error = validateCategoryFields(category);
  if (error.result) return error;

  const { name } = category;
  const { id } = await Category.create(name);
  
  return { type: 201, result: { id, name } };
};

module.exports = {
  createCategory,
};
