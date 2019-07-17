const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const User = require('./user');
const Course = require('./course');

const Message = mongoose.Schema({
  body: String,
  mimeType: String,
  user: { type: ObjectId, ref: User },
  course: { type: ObjectId, ref: Course }
});

module.exports = mongoose.model('messages', Message);
