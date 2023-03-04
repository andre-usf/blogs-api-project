const userService = require('../services/userService');

const createUser = async (req, res) => {
  const response = await userService.createUser(req.body);
  
  return res.status(response.type).json(response.result);
};

module.exports = {
  createUser,
};
