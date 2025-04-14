const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Booking = require('../models/Booking');
const Event = require('../models/Event'); 

// Authentication middleware
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

// Booking route
router.post('/book-event', authenticateUser, async (req, res) => {
  const { eventId } = req.body;  // This is coming from the frontend
  const user = req.user; // This is decoded from the token

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Create the booking with the correct field names
    const newBooking = new Booking({
      event: eventId, // Use 'event' instead of 'eventId' as per the schema
      user: user._id, // Use 'user' instead of 'userId'
      eventTitle: event.title,
      eventDate: event.date,
      venue: event.venue,
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking successful', booking: newBooking });
  } catch (error) {
    console.error('Booking failed:', error);
    res.status(500).json({ message: 'Server error while booking ticket', error: error.message });
  }
});



module.exports = router;
