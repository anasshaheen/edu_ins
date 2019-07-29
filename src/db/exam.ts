import { Schema, model } from 'mongoose';

import User from './user';
import Course from './course';

const { ObjectId } = Schema.Types;

const Exam = new Schema({
  name: String,
  description: String,
  grade: Number,
  course: { type: ObjectId, ref: Course },
  author: { type: ObjectId, ref: User },
  createdAt: Date,
});

export default model('exams', Exam);
