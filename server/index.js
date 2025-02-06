const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');

    // Create admin user if it doesn't exist
    const adminEmail = 'admin@eventorial.com';
    const admin = await User.findOne({ email: adminEmail });

    if (!admin) {
      await User.create({
        name: 'Admin',
        email: adminEmail,
        password: 'admin', 
        userType: 'admin',
      });
      console.log('Admin user created');
    }
  })
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));