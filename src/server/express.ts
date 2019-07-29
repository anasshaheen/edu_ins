import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';

export default () => {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(compression());

  return app;
};
