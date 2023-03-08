const { createToken } = require('../auth/auth');
const { getUserByEmail } = require('./userService');

const isBodyValid = (username, password) => username && password;

const login = async (email, password) => {
  try {
    if (!isBodyValid(email, password)) {
      return { type: 400, result: { message: 'Some required fields are missing' } };
    }
  
    const user = await getUserByEmail(email);
  
    if (!user || user.password !== password) {
      return { type: 400, result: { message: 'Invalid fields' } };
    }
  
    const { password: userPassword, ...userWithoutPassword } = user.dataValues;
  
    const token = createToken(userWithoutPassword);
  
    return { type: 200, result: { token } };  
  } catch (error) {
    return { type: 500, result: { message: 'Erro interno', error } };
  }
};

module.exports = {
  login,
};
