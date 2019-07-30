import { HostingEnvironment } from '../utils';

interface ServerConfig {
  apollo: ApolloConfig;
  env: string;
  port: number | undefined;
}

interface ApolloConfig {
  introspection: boolean;
  playground: boolean;
}

const nodeEnv = <string>process.env.NODE_ENV;
const enablePlaygound = HostingEnvironment.isDevelopment(nodeEnv);
const serverConfig: ServerConfig = {
  apollo: {
    introspection: enablePlaygound,
    playground: enablePlaygound,
  },
  env: nodeEnv,
  port: <number | undefined>process.env.PORT,
};

export default serverConfig;
