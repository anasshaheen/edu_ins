const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const User = require('./user');

const Resource = mongoose.Schema({
  title: String,
  description: String,
  url: String,
  user: { type: ObjectId, ref: User }
});

module.exports = Resource;
