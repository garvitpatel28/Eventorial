const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Booking = require('../models/Booking');
const Event = require('../models/Event'); 
const Ticket = require('../models/Ticket'); 


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

const mongoose = require('mongoose'); 



router.get('/admin/bookings', authenticateUser, async (req, res) => {
  try {
    
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }


    const bookings = await Ticket.find().populate('userId eventId');
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err.stack);
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
  }
});



module.exports = router;
