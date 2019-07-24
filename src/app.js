require('dotenv').config();

const express = require('express');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const { createServer } = require('http');
const { subscribe, execute } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const { initDb, initAWSService, seedDb } = require('./services');
const { typeDefs, resolvers, schemaDirectives } = require('./schema');
const { validateToken } = require('./utils');

module.exports = async () => {
  try {
    initDb();
    initAWSService();
    await seedDb();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      tracing: true,
      schemaDirectives,
      subscriptions: {
        path: '/subscriptions',
        async onConnect(connectionParams, _) {
          if (connectionParams.authToken) {
            return await validateToken(connectionParams.authToken);
          }

          throw new Error('User is not authorized!');
        },
        onDisconnect() {
          console.log('Dicconnected from socket!!!');
        }
      },
      context: async ({ req, connection }) => {
        if (connection) {
          return connection.context;
        } else {
          let token = req.headers.authorization || '';
          if (!token) {
            return { user: undefined, isLoggedIn: false };
          }

          token = token.substring(7).trim();

          return await validateToken(token);
        }
      }
    });

    const port = process.env.PORT || 4000;
    const app = express();

    server.applyMiddleware({ app, path: '/graphql' });

    const httpServer = createServer(app);
    server.installSubscriptionHandlers(httpServer);

    httpServer.listen({ port }, () => {
      new SubscriptionServer(
        {
          execute,
          subscribe,
          schema: makeExecutableSchema({
            typeDefs,
            resolvers,
            schemaDirectives
          })
        },
        {
          server: app,
          path: '/subscriptions'
        }
      );

      console.log(`server is starting at port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
