const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    
    let token = req.header('Authorization')?.replace('Bearer ', '');

   
    if (!token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
 
    const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });

    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token or user not found' });
    }

  
    req.user = user;
    req.token = token;

 
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(401).json({ message: 'Invalid or expired token', error: error.message });
  }
};


const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticateUser;

module.exports = auth;
