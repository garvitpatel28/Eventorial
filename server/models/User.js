const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { 
    type: String, 
    enum: ['user', 'organizer', 'admin'], 
    default: 'user' 
  },
  tokens: [{
    token: { type: String, required: true }
  }]
});

// Hash password before saving to the database
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords for login
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate and save a JWT token to the tokens array
UserSchema.methods.generateAuthToken = async function () {
  // Create the JWT token
  const token = jwt.sign({ _id: this._id, userType: this.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Push the generated token to the tokens array
  this.tokens = this.tokens.concat({ token });

  // Save the user with the new token
  await this.save();

  // Return the generated token
  return token;
};

// Create the User model based on the schema
const User = mongoose.model('User', UserSchema);

module.exports = User;
