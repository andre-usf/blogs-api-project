const categoriesService = require('../services/categoriesService');

const createCategory = async (req, res) => {
  const response = await categoriesService.createCategory(req.body);
  console.log(response);
  return res.status(response.type).json(response.result);
};

module.exports = {
  createCategory,
};