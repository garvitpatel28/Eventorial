const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

router.get('/getAllUsers', async (req, res) => {
    try {
      const users = await User.find({}, 'name email userType'); // Fetch all users, selecting specific fields
      res.status(200).json(users);
  
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });


router.delete('/:id', async (req, res) => {
try {
    const { id } = req.params;

    // Find and delete user by ID
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
    return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
} catch (err) {
    console.log("error", err)
    res.status(500).json({ message: 'Error deleting user', error: err });
}
});

module.exports = router;
