const mongoose = require('mongoose');

const Exam = mongoose.Schema({
  name: String,
  description: String,
  grade: Number
});

module.exports = Exam;
