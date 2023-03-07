const { verifyToken } = require('../auth/auth');

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
    
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  
  try {
    const payloadToken = verifyToken(authorization);
    
    req.userToken = payloadToken.payload;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token', error });
  }
};

module.exports = validateToken;
