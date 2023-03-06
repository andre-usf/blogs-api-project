const userService = require('../services/userService');

const getAllUsers = async (_req, res) => {
  const response = await userService.getAllUsers();
  return res.status(response.type).json(response.result);
};

const createUser = async (req, res) => {
  const response = await userService.createUser(req.body);
  
  return res.status(response.type).json(response.result);
};

module.exports = {
  createUser,
  getAllUsers,
};
