const { User } = require('../models');
const { createToken } = require('../auth/auth');
const validateUserFields = require('./validations/validateUserFields');

const ERRO_INTERNO = 'Erro interno';

const getAllUsers = async () => {
  try { 
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    
    return { type: 200, result: users };
  } catch (error) {
    return { type: 500, result: { message: ERRO_INTERNO, error } };
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

    if (!user) return { type: 404, result: { message: 'User does not exist' } };

    return { type: 200, result: user };
  } catch (error) {
    return { type: 500, result: { message: ERRO_INTERNO, error } };
  }
};

const getUserByEmail = async (email) => User.findOne({ where: { email } });

const createUser = async (user) => {
  try {
    const error = validateUserFields(user);
    if (error.type) return error;
    
    const verifyUser = await getUserByEmail(user.email);
    if (verifyUser) return { type: 409, result: { message: 'User already registered' } };

    const { displayName, email, password, image } = user;
    const createdUser = await User.create({ displayName, email, password, image });
    
    const { password: userPassword, ...userWithoutPassword } = createdUser.dataValues;
    const token = createToken(userWithoutPassword);

    return { type: 201, result: { token } };
  } catch (error) {
    return { type: 500, result: { message: ERRO_INTERNO, error } };
  }
};

const deleteUser = async ({ userToken }) => {
  try { 
    const { id: userId } = userToken;

    await User.destroy({ where: { id: userId } });

    return { type: 204, result: '' };
  } catch (error) {
    return { type: 500, result: { message: ERRO_INTERNO, error } };
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  deleteUser,
};
