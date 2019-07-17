const mongoose = require('mongoose');

const SyllableSection = mongoose.Schema({
  title: String,
  description: String
});

module.exports = SyllableSection;
