import dotenv from 'dotenv';
dotenv.config();

import { initDb } from '../services';
import { DataSeeder } from './utils';
import server from '../app';

const seeder = new DataSeeder();

const starter = async () => {
  const db = await initDb();
  await db.dropDatabase();

  await seeder.seedUsers();

  await server();
};

export default starter;
