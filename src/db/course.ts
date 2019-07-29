import { Schema, model } from 'mongoose';

import User from './user';
import Syllable from './syllable';
import Resource from './resource';

const { ObjectId } = Schema.Types;

const Course = new Schema({
  name: {
    type: String,
    index: true,
  },
  description: String,
  syllable: Syllable,
  teachers: [{ type: ObjectId, ref: User }],
  resources: [Resource],
  createdAt: Date,
});

export default model('courses', Course);
