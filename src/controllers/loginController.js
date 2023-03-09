const loginService = require('../services/loginService');

const login = async (req, res) => {
  const { email, password } = req.body;
  
  const response = await loginService.login(email, password);

  return res.status(response.type).json(response.result);
};

module.exports = login;
