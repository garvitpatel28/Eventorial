const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authenticateUser = require('../middleware/auth'); 
const Booking = require('../models/Booking');
const Ticket = require('../models/Ticket');
const auth = require('../middleware/auth'); 


router.delete('/ticket/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Booking not found' });
    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }


    const token = jwt.sign({ id: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });

    
    user.tokens = user.tokens.concat({ token });
    await user.save();

   
    res.status(200).json({
      message: 'Login successful',
      token,
      userType: user.userType,
      userId: user._id,  
    });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.post('/signup', async (req, res) => {
  const { name, email, password, userType } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = new User({ name, email, password, userType });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/logout', (req, res) => {
  try {
    
    res.clearCookie('token'); 

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error.message);
    res.status(500).json({ message: 'Error logging out', error: error.message });
  }
});

router.get('/my-bookings', auth, async (req, res) => {
  try {
   
    const bookings = await Booking.find({ user: req.user._id })
      .populate('event', 'name date');
    
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
