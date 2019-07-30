import mongoose from 'mongoose';

import { db } from '../config';

export default () => {
  mongoose.Promise = global.Promise;

  mongoose.connect(db.DATABASE_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
  });

  mongoose.connection.once('open', async () => {
    console.log(`Connected to db at ${db.DATABASE_URI}`);
  });
};
