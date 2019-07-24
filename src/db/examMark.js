const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const User = require('./user');
const Exam = require('./exam');

const ExamMark = mongoose.Schema({
  exam: { type: ObjectId, ref: Exam, index: true },
  student: { type: ObjectId, ref: User },
  grade: Number,
  createdAt: Date
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
