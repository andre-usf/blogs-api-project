const userService = require('../services/userService');

const getAllUsers = async (_req, res) => {
  const response = await userService.getAllUsers();
  return res.status(response.type).json(response.result);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const response = await userService.getUserById(id);
  
  return res.status(response.type).json(response.result);
};

const createUser = async (req, res) => {
  const response = await userService.createUser(req.body);
  return res.status(response.type).json(response.result);
};

const deleteUser = async (req, res) => {
  const response = await userService.deleteUser(req);
  return res.status(response.type).send();
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
};
