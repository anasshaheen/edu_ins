import { Schema, model } from 'mongoose';

import User from './user';
import ExamMark from './examMark';
import Course from './course';

const { ObjectId } = Schema.Types;

const CourseStudent = new Schema({
  course: { type: ObjectId, ref: Course },
  student: { type: ObjectId, ref: User },
  marks: [{ type: ObjectId, ref: ExamMark }],
  enrollementDate: Date,
});

CourseStudent.index(
  {
    course: 1,
    student: 1,
  },
  {
    unique: true,
  },
);

export default model('courseStudents', CourseStudent);
