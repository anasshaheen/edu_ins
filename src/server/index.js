const { makeExecutableSchema } = require('apollo-server-express');
const { createServer } = require('http');
const { subscribe, execute } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const apollo = require('./apollo')();
const express = require('./express')();
const graphQLSchema = require('../schema');

const port = process.env.PORT || 4000;

module.exports = () => {
  apollo.applyMiddleware({ app: express, path: '/graphql' });

  const httpServer = createServer(express);
  apollo.installSubscriptionHandlers(httpServer);

  httpServer.listen({ port }, () => {
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema: makeExecutableSchema(graphQLSchema)
      },
      {
        server: express,
        path: '/subscriptions'
      }
    );
  });
};
