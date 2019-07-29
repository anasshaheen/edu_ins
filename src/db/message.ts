import { Schema, model } from 'mongoose';

import User from './user';
import Course from './course';

const { ObjectId } = Schema.Types;

const Message = new Schema({
  body: String,
  user: { type: ObjectId, ref: User },
  course: { type: ObjectId, ref: Course },
  createdAt: Date,
});

export default model('messages', Message);
