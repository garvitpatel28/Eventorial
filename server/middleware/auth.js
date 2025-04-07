const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Try getting the token from the Authorization header first
    let token = req.header('Authorization')?.replace('Bearer ', '');

    // If no token found in Authorization header, check if it's in cookies (if cookies are used)
    if (!token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    // Decode the token and verify it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user based on the decoded information
    const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });

    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token or user not found' });
    }

    // Attach user and token to the request object
    req.user = user;
    req.token = token;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(401).json({ message: 'Invalid or expired token', error: error.message });
  }
};

// Middleware to authenticate the user based on JWT token
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is sent as a Bearer token

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user data to the request object
    next(); // Move to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticateUser;

module.exports = auth;
