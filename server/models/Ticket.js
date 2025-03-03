// models/Ticket.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  email: String,
  mobileNo: String,
  eventId: String,
});

module.exports = mongoose.model('Ticket', ticketSchema);