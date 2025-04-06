const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authenticateUser = require('../middleware/auth'); // Correct import

router.get('/user/:userId', authenticateUser, async (req, res) => {
  const { userId } = req.params;

  // Ensure the userId from the token matches the userId in the URL
  if (req.user._id.toString() !== userId) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const bookings = await Booking.find({ user: userId }).populate('event', 'title date venue');
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    res.status(500).json({ message: 'Error fetching the bookings', error: error.message });
  }
});

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

    // Send response with token, userType, and userId
    res.status(200).json({
      message: 'Login successful',
      token,
      userType: user.userType,
      userId: user._id,  // Send userId as part of the response
    });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Signup route
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

// Logout route
router.post('/logout', (req, res) => {
  try {
    // Clear the JWT cookie if you're using cookies for storing tokens
    res.clearCookie('token'); // Clear the token cookie if it's stored in cookies

    // Send a response confirming logout
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error.message);
    res.status(500).json({ message: 'Error logging out', error: error.message });
  }
});

module.exports = router;
