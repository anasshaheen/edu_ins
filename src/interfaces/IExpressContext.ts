import express from 'express';

interface IExpressContext {
  req: express.Request;
  connection?: IExecutionParams;
}

interface IExecutionParams<TContext = any> {
  context: TContext;
}

export { IExpressContext, IExecutionParams };
