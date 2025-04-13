// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User');
const Event = require('./models/Event');
const Ticket = require('./models/Ticket');
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');
const ticketRoutes = require('./routes/ticket');
const bookingRoutes = require('./routes/Bookings');
const authRoutes = require('./routes/auth'); 

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, 
}));

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');

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

    await createDummyEvents(admin._id);
  })
  .catch(err => console.log(err));

async function createDummyEvents(adminId) {
  try {
    const existingEvents = await Event.countDocuments();

    if (existingEvents === 0) {
      const dummyEvents = [
        {
          title: "Vancouver Jazz Festival",
          description: "A celebration of jazz music featuring world-renowned jazz bands and local talent.",
          date: new Date('2025-08-15'),
          time: "19:30",
          venue: "Vancouver Art Gallery Plaza",
          ticketAvailability: 1500,
          organizer: adminId,
          category: "Music"
        },
        {
          title: "Toronto Electronic Music Bash",
          description: "The ultimate EDM experience with top DJs and spectacular light shows.",
          date: new Date('2025-10-05'),
          time: "22:00",
          venue: "Ontario Place, Toronto",
          ticketAvailability: 3000,
          organizer: adminId,
          category: "Music"
        },
        {
          title: "Toronto International Marathon",
          description: "A premier international marathon, attracting athletes from around the globe to race through Toronto’s scenic routes.",
          date: new Date('2025-10-12'),
          time: "08:00",
          venue: "Nathan Phillips Square, Toronto",
          ticketAvailability: 5000,
          organizer: adminId,
          category: "Sports"
        },
        {
          title: "Canada Startup Expo 2024",
          description: "The most awaited event for Canadian startups, featuring discussions, networking, and exhibitions on innovation.",
          date: new Date('2025-11-15'),
          time: "09:00",
          venue: "Metro Toronto Convention Centre",
          ticketAvailability: 2000,
          organizer: adminId,
          category: "Conference"
        },
        {
          title: "AI and Tech Summit 2024",
          description: "Leading professionals and experts gather to discuss the future of artificial intelligence and technology.",
          date: new Date('2025-08-20'),
          time: "10:00",
          venue: "Vancouver Convention Centre",
          ticketAvailability: 2500,
          organizer: adminId,
          category: "Conference"
        },
        {
          title: "Photography Masterclass",
          description: "A workshop for photographers of all levels, focusing on landscape and portrait photography techniques.",
          date: new Date('2025-06-15'),
          time: "10:00",
          venue: "Ryerson University, Toronto",
          ticketAvailability: 100,
          organizer: adminId,
          category: "Workshop"
        },
        {
          title: "Ottawa Winter Festival",
          description: "Canada's biggest winter celebration with ice sculptures, music, food, and family-friendly activities.",
          date: new Date('2025-12-05'),
          time: "16:00",
          venue: "Lansdowne Park, Ottawa",
          ticketAvailability: 5000,
          organizer: adminId,
          category: "Festival"
        },
        {
          title: "Toronto Art Fair",
          description: "A major event showcasing contemporary art by leading artists, with installations and live art performances.",
          date: new Date('2025-10-15'),
          time: "11:00",
          venue: "Metro Toronto Convention Centre",
          ticketAvailability: 2000,
          organizer: adminId,
          category: "Art"
        },
        {
          title: "Vancouver Contemporary Art Show",
          description: "An exhibition featuring some of the most dynamic and innovative contemporary artists in Vancouver.",
          date: new Date('2025-09-10'),
          time: "14:00",
          venue: "Vancouver Art Gallery",
          ticketAvailability: 500,
          organizer: adminId,
          category: "Art"
        },
        {
          title: "Canadian Food Expo",
          description: "A celebration of Canada’s diverse culinary culture, featuring top chefs and local food artisans.",
          date: new Date('2025-08-25'),
          time: "12:00",
          venue: "Exhibition Place, Toronto",
          ticketAvailability: 3000,
          organizer: adminId,
          category: "Other"
        },
        {
          title: "Outdoor Adventure Expo",
          description: "An event for outdoor enthusiasts, featuring workshops on hiking, camping, and eco-tourism.",
          date: new Date('2025-07-20'),
          time: "10:00",
          venue: "Alberta Convention Centre, Calgary",
          ticketAvailability: 1500,
          organizer: adminId,
          category: "Other"
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
app.get('/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find()
    .populate('eventId', 'title date venue'); 
      console.log(tickets)
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/tickets/user/:userId', async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.params.userId })
      .populate('eventId', 'title date venue'); 
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.use('/api/auth', authRoutes); 
app.use('/api/user', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/tickets', ticketRoutes);

app.post('/book-ticket/', async (req, res) => {
  try {
    const ticketData = req.body;

    if (!ticketData || !ticketData.firstName || !ticketData.eventId) {
      return res.status(400).json({ message: 'Missing required ticket info' });
    }

    const newTicket = new Ticket(ticketData);
    await newTicket.save();

    res.status(201).json({ message: 'Ticket booked successfully', ticket: newTicket });
  } catch (err) {
    console.error('Error booking ticket:', err.message);
    res.status(500).json({ message: 'Server error while booking ticket' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
