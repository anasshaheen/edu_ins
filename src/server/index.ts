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
  server: ApolloServer;
  app: Express;

  constructor() {
    this.server = apollo();
    this.app = express();
  }

  start() {
    this.server.applyMiddleware({ app: this.app, path: '/graphql' });

    const httpServer = createServer(this.app);
    this.server.installSubscriptionHandlers(httpServer);

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
          server: <any>this.app,
          path: '/subscriptions',
        },
      );
    });
  }
}

export default Server;
