const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure the correct path to the User model
const jwt = require('jsonwebtoken');

// Your existing route code
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      userType: user.userType, // Return userType
    });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in user', error: err });
  }
});

// Export the router
module.exports = router;
