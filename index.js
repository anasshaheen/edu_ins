const start = require('./src/app');

start()
  .then(() => console.log('started'))
  .catch(err => console.log(err));
