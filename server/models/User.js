const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAuthToken = async function () {

  const token = jwt.sign({ _id: this._id, userType: this.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });


  this.tokens = this.tokens.concat({ token });


  await this.save();

 
  return token;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
