const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    console.log('No token received');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const actualToken = token.split(' ')[1]; // Extract the token part
  if (!actualToken) {
    console.log('Invalid token format');
    return res.status(401).json({ msg: 'Token format invalid' });
  }

  try {
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded.user; // Assuming the token contains `user` info
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
