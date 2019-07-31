import mongoose from 'mongoose';

import { db } from '../config';
import { Db } from 'mongodb';

async function initDb(): Promise<Db> {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;

    mongoose.connect(
      db.DATABASE_URI,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
      },
      err => {
        if (err) {
          reject(err);
        }
      },
    );

    mongoose.connection.once('open', async () => {
      console.log(`Connected to db at ${db.DATABASE_URI}`);
      resolve(mongoose.connection.db);
    });
  });
}

export default initDb;
