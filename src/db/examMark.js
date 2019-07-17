const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const User = require('./user');

const ExamMark = mongoose.Schema({
  exam: { type: ObjectId, index: true },
  student: { type: ObjectId, ref: User },
  grade: Number
});

ExamMark.index(
  {
    exam: 1,
    student: 1
  },
  {
    unique: true
  }
);

module.exports = mongoose.model('examMarks', ExamMark);
