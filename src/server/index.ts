import { makeExecutableSchema, ApolloServer } from 'apollo-server-express';
import { createServer, Server } from 'http';
import { subscribe, execute } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { Express } from 'express';

import apollo from './apollo';
import express from './express';
import graphQLSchema from '../schema';
import { server as serverConfig } from '../config';

class AppServer {
  private _server: ApolloServer;
  private _app: Express;
  private _port: number;

  constructor(port: number | undefined = undefined) {
    this._server = apollo();
    this._app = express();
    this._port = port || (serverConfig.port || 4000);
    this._server.applyMiddleware({ app: this._app, path: '/graphql' });
  }

  get apolloServer(): ApolloServer {
    return this._server;
  }

  get express() {
    return this._app;
  }

  start(): Server {
    const httpServer = createServer(this._app);
    this._server.installSubscriptionHandlers(httpServer);

    return httpServer.listen({ port: this._port }, () => {
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

export default AppServer;
