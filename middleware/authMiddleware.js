const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  // Extract token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info from the token to the request
    req.user = decoded.user;

    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};


module.exports = authMiddleware;
