const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Booking = require('../models/Booking');
const Event = require('../models/Event'); 


const authenticateUser = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ message: 'User not logged in' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};


router.get('/user/:userId', authenticateUser, async (req, res) => {
    const { userId } = req.params;
  
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
  
    try {
      const bookings = await Booking.find({ user: userId }).populate('event', 'title date venue');
      console.log('Bookings:', bookings);
      res.json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error.message);
      res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
});

router.post('/book-event', authenticateUser, async (req, res) => {
  const { eventId } = req.body;
  const user = req.user;

  try {
    
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const newBooking = new Booking({
      eventId,
      userId: user._id,
      userName: user.name,
      eventTitle: event.title,
      eventDate: event.date,
      venue: event.venue,
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking successful', booking: newBooking });
  } catch (error) {
    console.error('Booking failed:', error);
    res.status(500).json({ message: 'Server error while booking ticket' });
  }
});

module.exports = router;
