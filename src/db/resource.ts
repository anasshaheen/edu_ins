import { Schema } from 'mongoose';

import User from './user';

const { ObjectId } = Schema.Types;

const Resource = new Schema({
  title: String,
  description: String,
  url: String,
  user: { type: ObjectId, ref: User },
});

export default Resource;
