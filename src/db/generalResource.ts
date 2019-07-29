import { Schema, model } from 'mongoose';

import User from './user';

const { ObjectId } = Schema.Types;

const GeneralResource = new Schema({
  title: String,
  description: String,
  url: String,
  user: { type: ObjectId, ref: User },
  createdAt: Date,
});

export default model('generalResources', GeneralResource);
