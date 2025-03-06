const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a token
    const token = jwt.sign({ id: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Save token to the user's tokens array
    user.tokens = user.tokens.concat({ token });
    await user.save();

    // Send response with token
    res.status(200).json({
      message: 'Login successful',
      token,
      userType: user.userType,
    });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/signup', async (req, res) => {
  const { name, email, password, userType } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create new user
    const user = new User({ name, email, password, userType });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
module.exports = router;
