import { ApolloServer } from 'apollo-server-express';
import { IContextState, IExpressContext } from 'src/interfaces';

import { server as serverConfig } from '../config';
import schema from '../schema';
import { RedisClient, TokenUtils } from '../utils';

const redisClient = new RedisClient();

async function handleContext({
  req,
  connection,
}: IExpressContext): Promise<IContextState> {
  if (connection) {
    return connection.context;
  } else {
    const result: IContextState = {
      user: undefined,
      isLoggedIn: false,
      redisClient,
    };

    let token = req.headers.authorization || '';
    if (!token) {
      return result;
    }

    token = token.substring(7).trim();

    const validationRes = await TokenUtils.validateToken(token);

    result.isLoggedIn = validationRes.isLoggedIn;
    result.user = validationRes.user;

    return result;
  }
}

export default () => {
  const server = new ApolloServer({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers,
    tracing: serverConfig.apollo.tracing,
    schemaDirectives: schema.schemaDirectives,
    introspection: serverConfig.apollo.introspection,
    playground: serverConfig.apollo.playground,
    subscriptions: {
      path: '/subscriptions',
      async onConnect(connectionParams: any) {
        if (connectionParams.authToken) {
          return await TokenUtils.validateToken(connectionParams.authToken);
        }

        throw new Error('User is not authorized!');
      },
      onDisconnect() {
        console.log('Dicconnected from socket!!!');
      },
    },
    context: handleContext,
  });

  return server;
};
