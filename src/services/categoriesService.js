const { Category } = require('../models');
const validateCategoryFields = require('./validations/validateCategoryFields');

const ERRO_INTERNO = 'Erro interno';

const getAllCategories = async () => {
  try { 
    const categories = await Category.findAll();
    return { type: 200, result: categories };
  } catch (error) {
    return { type: 500, result: { message: ERRO_INTERNO, error } };
  }
};

const createCategory = async (category) => {
  try {
    const error = validateCategoryFields(category);
    if (error.type) return error;

    const { name } = category;
    const { id } = await Category.create({ name });
    
    return { type: 201, result: { id, name } };
  } catch (error) {
    return { type: 500, result: { message: ERRO_INTERNO, error } };
  }
};

module.exports = {
  getAllCategories,
  createCategory,
};
