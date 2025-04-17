const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const mongoose = require('mongoose');
const authenticateUser = require('../middleware/auth');



router.post('/book-event', authenticateUser, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      address,
      email,
      mobileNo,
      numberOfTickets,
      seatingPreference,
      eventId,
    } = req.body;

    const userId = req.user._id;

    const newTicket = new Ticket({
      userId: userId,
      eventId: mongoose.Types.ObjectId(eventId),
      firstName,
      lastName,
      address,
      email,
      mobileNo,
      numberOfTickets,
      seatingPreference,
    });

    await newTicket.save();

    res.status(201).json({ message: 'Booking successful', ticket: newTicket });
  } catch (err) {
    console.error('Ticket Booking Error:', err);
    res.status(500).json({ message: 'Failed to book ticket', error: err.message });
  }
});


router.get('/all', async (req, res) => {
  try {
    const bookings = await Ticket.find()
      .populate('eventId')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching all bookings:', err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});


router.get('/by-event/:eventId', authenticateUser, async (req, res) => {
  try {
    const { eventId } = req.params;
    const tickets = await Ticket.find({ eventId: eventId });
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching tickets by event:', error);
    res.status(500).json({ message: 'Failed to fetch tickets', error: error.message });
  }
});

module.exports = router;
