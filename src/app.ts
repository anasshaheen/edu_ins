import { initDb, initAWSService, seedDb } from './services';
import AppServer from './server';

export default async () => {
  try {
    await initDb();
    initAWSService();
    await seedDb();

    const server = new AppServer();
    server.start();
  } catch (err) {
    console.log(err);
  }
};
