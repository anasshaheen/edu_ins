require('dotenv').config();

const { initDb, initAWSService, seedDb } = require('./services');
const startServer = require('./server');

module.exports = async () => {
  try {
    initDb();
    initAWSService();
    await seedDb();

    startServer();
  } catch (err) {
    console.log(err);
  }
};
