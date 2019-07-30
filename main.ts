import start from './src/app';

start()
  .then(() => console.log('server started!!!'))
  .catch(err => console.log('failed to start server', err));
