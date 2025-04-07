const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  // User reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true
  },
  // Event reference
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  // Ticket details
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  mobileNo: { type: String, required: true },
  numberOfTickets: { type: Number, required: true },
  seatingPreference: { 
    type: String, 
    enum: ['Standard', 'VIP', 'Balcony'], 
    default: 'Standard' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);