const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

router.get('/by-event/:eventId', async (req, res) => {
  try {
    const tickets = await Ticket.find({ eventId: req.params.eventId });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate('eventId', 'title date venue'); 
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
  

module.exports = router;
