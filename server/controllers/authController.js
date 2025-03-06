const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Ensure tokens array exists and add new token
    user.tokens = user.tokens || [];
    user.tokens.push({ token });
    await user.save();

    res.json({ message: 'Login successful', token, userType: user.userType });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };
