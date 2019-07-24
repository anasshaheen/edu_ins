const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers, schemaDirectives } = require('../schema');
const { validateToken } = require('../utils');

module.exports = () => {
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

  return server;
};
