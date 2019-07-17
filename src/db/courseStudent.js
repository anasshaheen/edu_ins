const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const Course = require('./course');
const User = require('./user');
const ExamMark = require('./examMark');

const CourseStudent = mongoose.Schema({
  course: { type: ObjectId, ref: Course },
  student: { type: ObjectId, ref: User },
  marks: [{ type: ObjectId, ref: ExamMark }]
});

CourseStudent.index(
  {
    course: 1,
    student: 1
  },
  {
    unique: true
  }
);

module.exports = mongoose.model('courseStudents', CourseStudent);
