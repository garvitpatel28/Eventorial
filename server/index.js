// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User');
const Event = require('./models/Event');
const Ticket = require('./models/Ticket');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');

    // Create admin user if it doesn't exist
    const adminEmail = 'admin@eventorial.com';
    let admin = await User.findOne({ email: adminEmail });

    if (!admin) {
      admin = await User.create({
        name: 'Admin',
        email: adminEmail,
        password: 'admin',
        userType: 'admin',
      });
      console.log('Admin user created');
    }

    // Add dummy events
    await createDummyEvents(admin._id);
  })
  .catch(err => console.log(err));

// Dummy data creation function
async function createDummyEvents(adminId) {
  try {
    const existingEvents = await Event.countDocuments();
    
    if (existingEvents === 0) {
      const dummyEvents = [
        {
          title: "Summer Music Festival",
          description: "Annual summer music festival featuring top artists",
          date: new Date('2024-07-15'),
          time: "18:00",
          venue: "Central Park, New York",
          ticketAvailability: 5000,
          organizer: adminId,
          category: "Music"
        },
        {
          title: "Tech Conference 2024",
          description: "International technology and innovation conference",
          date: new Date('2024-09-20'),
          time: "09:00",
          venue: "Convention Center, San Francisco",
          ticketAvailability: 1000,
          organizer: adminId,
          category: "Conference"
        },
        {
          title: "Marathon City Run",
          description: "Annual city marathon for all fitness levels",
          date: new Date('2024-05-10'),
          time: "07:30",
          venue: "City Central Stadium",
          ticketAvailability: 2000,
          organizer: adminId,
          category: "Sports"
        },
        {
          title: "Art Exhibition Opening",
          description: "Modern art exhibition featuring emerging artists",
          date: new Date('2024-06-01'),
          time: "19:00",
          venue: "Contemporary Art Museum",
          ticketAvailability: 300,
          organizer: adminId,
          category: "Art"
        }
      ];

      await Event.insertMany(dummyEvents);
      console.log('Dummy events created successfully');
    }
  } catch (error) {
    console.error('Error creating dummy events:', error.message);
  }
}

// Fetch events endpoint
app.get('/events', async (req, res) => {
  try {
    console.log('Fetching events from the database...');
    const events = await Event.find().populate('organizer', 'name email');
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error.message);
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/events', require('./routes/event')); // Add this line

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));