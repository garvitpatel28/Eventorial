// server/routes/event.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth'); // Import the auth middleware

// Create a new event (protected route)
router.post('/create', auth, async (req, res) => {
  try {
    const { title, description, date, time, venue, ticketAvailability, category } = req.body;
    const organizer = req.user._id; // Get the organizer's ID from the authenticated user

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      venue,
      ticketAvailability,
      category,
      organizer,
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
});

module.exports = router;