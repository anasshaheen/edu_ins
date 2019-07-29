import start from './src/app';

start()
  .then(() => console.log('started'))
  .catch(err => console.log(err));
