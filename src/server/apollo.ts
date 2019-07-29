import { ApolloServer } from 'apollo-server-express';

import schema from '../schema';
import { validateToken } from '../utils';
import { server as serverConfig } from '../config';

export default () => {
  const server = new ApolloServer({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers,
    tracing: true,
    schemaDirectives: schema.schemaDirectives,
    introspection: serverConfig.apollo.introspection,
    playground: serverConfig.apollo.playground,
    subscriptions: {
      path: '/subscriptions',
      async onConnect(connectionParams: any, _: any) {
        if ((<any>connectionParams).authToken) {
          return await validateToken((<any>connectionParams).authToken);
        }

        throw new Error('User is not authorized!');
      },
      onDisconnect() {
        console.log('Dicconnected from socket!!!');
      },
    },
    context: async ({ req, connection }: any) => {
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
    },
  });

  return server;
};
