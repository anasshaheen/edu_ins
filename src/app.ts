import dotenv from 'dotenv';

dotenv.config();

import { initDb, initAWSService, seedDb } from './services';
import Server from './server';

export default async () => {
  try {
    initDb();
    initAWSService();
    await seedDb();

    const server = new Server();
    server.start();
  } catch (err) {
    console.log(err);
  }
};
