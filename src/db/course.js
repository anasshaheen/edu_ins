const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const User = require('./user');
const Syllable = require('./syllable');
const Exam = require('./exam');
const Resource = require('./resource');

const Course = mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  description: String,
  syllable: Syllable,
  teachers: [{ type: ObjectId, ref: User }],
  exams: [Exam],
  resources: [Resource]
});

module.exports = mongoose.model('courses', Course);
