const handleErrorMessage = require('../../utils/handleErrorMessage');
const schemas = require('./schemas');

const validateUserFields = (user) => {
  const { error } = schemas.userSchema.validate(user);
  
  if (error) return { type: 400, result: handleErrorMessage(error) };
  
  return { type: null, result: '' };
};

module.exports = validateUserFields;
