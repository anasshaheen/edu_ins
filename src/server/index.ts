import { makeExecutableSchema, ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { subscribe, execute } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { Express } from 'express';

import apollo from './apollo';
import express from './express';
import graphQLSchema from '../schema';

const port = process.env.PORT || 4000;

class Server {
  private _server: ApolloServer;
  private _app: Express;

  constructor() {
    this._server = apollo();
    this._app = express();
  }

  start() {
    this._server.applyMiddleware({ app: this._app, path: '/graphql' });

    const httpServer = createServer(this._app);
    this._server.installSubscriptionHandlers(httpServer);

    httpServer.listen({ port }, () => {
      new SubscriptionServer(
        {
          execute,
          subscribe,
          schema: makeExecutableSchema({
            typeDefs: graphQLSchema.typeDefs,
            resolvers: graphQLSchema.resolvers,
          }),
        },
        {
          server: <any>this._app,
          path: '/subscriptions',
        },
      );
    });
  }
}

export default Server;
