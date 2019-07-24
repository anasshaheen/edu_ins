const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const Course = require('./course');
const User = require('./user');

const Exam = mongoose.Schema({
  name: String,
  description: String,
  grade: Number,
  course: { type: ObjectId, ref: Course },
  author: { type: ObjectId, ref: User },
  createdAt: Date
});

module.exports = mongoose.model('exams', Exam);
