const handleErrorMessage = require('../../utils/handleErrorMessage');
const schemas = require('./schemas');

const validateCategoryFields = (category) => {
  const { error } = schemas.categorySchema.validate(category);
  
  if (error) return { type: 400, result: handleErrorMessage(error) };
  
  return { type: 201, result: null };
};

module.exports = validateCategoryFields;