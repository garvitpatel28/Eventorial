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

// Get all events by organizer ID
router.get('/by-organizer/:organizerId', async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.params.organizerId }).populate('organizer', 'name email');
    if (events.length === 0) {
      return res.status(404).json({ message: 'No events found for this organizer' });
    }
    res.json(events); // Send the events as an array
  } catch (err) {
    console.error('Error fetching events:', err.message);
    res.status(500).json({ message: 'Error fetching events', error: err.message });
  }
});


// GET /api/events/all
router.get('/all', async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name email');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events', error: err.message });
  }
});

// DELETE an event by ID
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event', error: error.message });
  }
});

module.exports = router;
