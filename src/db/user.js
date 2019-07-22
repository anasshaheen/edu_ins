const mongoose = require('mongoose');

const User = mongoose.Schema({
  avatar: String,
  phone: {
    type: String,
    unique: true,
    index: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    index: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    minLength: 6,
    maxLength: 12
  },
  password: String,
  role: String,
  createdAt: Date,
  updatedAt: Date
});

module.exports = mongoose.model('users', User);
