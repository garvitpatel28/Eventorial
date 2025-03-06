const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Check if Authorization header is present
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user with the given id and token
    const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });

    if (!user) {
      return res.status(401).json({ message: 'Invalid token or user not found' });
    }

    // Attach user and token to request object
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = auth;
