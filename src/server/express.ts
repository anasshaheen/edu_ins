import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import fs from 'fs';
import path from 'path';

export default () => {
  const app = express();

  var accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' },
  );

  app.use(cors());
  app.use(helmet());
  app.use(morgan('common', { stream: accessLogStream }));
  app.use(compression());

  return app;
};
