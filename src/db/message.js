const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const User = require('./user');
const Course = require('./course');

const {
  mimeTypes: { TEXT }
} = require('../constants');

const Message = mongoose.Schema({
  body: String,
  mimeType: {
    type: String,
    default: TEXT
  },
  user: { type: ObjectId, ref: User },
  course: { type: ObjectId, ref: Course }
});

module.exports = mongoose.model('messages', Message);
