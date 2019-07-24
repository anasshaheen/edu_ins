const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

module.exports = () => {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(morgan('combined'));

  return app;
};
