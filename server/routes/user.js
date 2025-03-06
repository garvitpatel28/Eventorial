const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth'); // Importing the auth middleware

// Route to get all users (secured with auth middleware)
router.get('/getAllUsers', auth, async (req, res) => {
  try {
    const users = await User.find({}, 'name email userType'); // Fetch all users, selecting specific fields
    res.status(200).json(users);

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Route to delete a user by ID (secured with auth middleware)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the authenticated user is an admin before allowing the deletion
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ message: 'You do not have permission to delete users' });
    }

    // Find and delete user by ID
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
});

module.exports = router;
