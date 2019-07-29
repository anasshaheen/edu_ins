import { Schema, model } from 'mongoose';

import User from './user';
import Exam from './exam';

const { ObjectId } = Schema.Types;

const ExamMark = new Schema({
  exam: { type: ObjectId, ref: Exam, index: true },
  student: { type: ObjectId, ref: User },
  grade: Number,
  createdAt: Date,
});

ExamMark.index(
  {
    exam: 1,
    student: 1,
  },
  {
    unique: true,
  },
);

export default model('examMarks', ExamMark);
