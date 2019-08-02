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
  private server: ApolloServer;
  private app: Express;
  private port: number;

  constructor() {
    this.server = apollo();
    this.app = express();
    this.port = serverConfig.port || 4000;
    this.server.applyMiddleware({ app: this.app, path: '/graphql' });
  }

  get apolloServer(): ApolloServer {
    return this.server;
  }

  get express() {
    return this.app;
  }

  start(): Server {
    const httpServer = createServer(this.app);
    this.server.installSubscriptionHandlers(httpServer);

    return httpServer.listen(
      { port: this.port },
      () =>
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
            server: this.app as any,
            path: '/subscriptions',
          },
        ),
    );
  }
}

export default AppServer;
