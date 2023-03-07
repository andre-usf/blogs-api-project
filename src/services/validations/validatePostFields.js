const validatePostFields = (post) => {
  const arrayValues = Object.values(post);
  const someValuesEmpty = arrayValues.some((value) => !value);
  
  if (someValuesEmpty) {
   return { type: 400, result: { message: 'Some required fields are missing' } };
  }

  return { type: null, result: '' };
};

module.exports = validatePostFields;
