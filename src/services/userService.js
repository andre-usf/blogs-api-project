const { User } = require('../models');
const { createToken } = require('../auth/auth');
const validateUserFields = require('./validations/validateUserFields');

const getUserByEmail = async (email) => User.findOne({ where: { email } });

const createUser = async (user) => {
  const error = validateUserFields(user);
  if (error.result) return error;
  
  const verifyUser = await getUserByEmail(user.email);
  if (verifyUser) return { type: 409, result: { message: 'User already registered' } };

  const { displayName, email, password, image } = user;
  const createdUser = await User.create({ displayName, email, password, image });
  
  const { password: userPassword, ...userWithoutPassword } = createdUser.dataValues;
  const token = createToken(userWithoutPassword);

  return { type: 201, result: { token } };
};

module.exports = {
  getUserByEmail,
  createUser,
};
