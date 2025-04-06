// routes/ticket.js
const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Get all tickets for a specific event
router.get('/by-event/:eventId', async (req, res) => {
  try {
    const tickets = await Ticket.find({ eventId: req.params.eventId });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


  

module.exports = router;
