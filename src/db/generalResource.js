const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const User = require('./user');

const GeneralResource = mongoose.Schema({
  title: String,
  description: String,
  url: String,
  user: { type: ObjectId, ref: User }
});

module.exports = mongoose.model('generalResources', GeneralResource);
