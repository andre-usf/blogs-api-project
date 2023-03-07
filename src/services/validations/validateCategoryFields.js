const handleErrorMessage = require('../../utils/handleErrorMessage');
const schemas = require('./schemas');

const validateCategoryFields = (category) => {
  const { error } = schemas.categorySchema.validate(category);
  
  if (error) return { type: 400, result: handleErrorMessage(error) };
  
  return { type: null, result: '' };
};

module.exports = validateCategoryFields;