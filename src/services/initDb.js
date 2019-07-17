const mongoose = require('mongoose');

const {
  db: { DATABASE_URI }
} = require('../config');

module.exports = () => {
  mongoose.Promise = global.Promise;

  mongoose.connect(DATABASE_URI, {
    useCreateIndex: true,
    useNewUrlParser: true
  });
  mongoose.connection.once('open', () =>
    console.log(`Connected to db at ${DATABASE_URI}`)
  );
};
