const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth'); // Importing the auth middleware

// Route to get all users (secured with auth middleware)
// Example: server/routes/user.js
router.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Avoid returning passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
});


// Route to delete a user by ID (secured with auth middleware)
// In routes/user.js or a relevant file
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});


module.exports = router;
