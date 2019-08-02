import HostingEnvironment from '../utils/hostingEnvironment';

interface ServerConfig {
  apollo: ApolloConfig;
  env: string;
  port: number | undefined;
}

interface ApolloConfig {
  introspection: boolean;
  playground: boolean;
  tracing: boolean;
}

const nodeEnv = process.env.NODE_ENV as string;
const enablePlaygound = HostingEnvironment.isDevelopment(nodeEnv);
const serverConfig: ServerConfig = {
  apollo: {
    introspection: enablePlaygound,
    playground: enablePlaygound,
    tracing: enablePlaygound,
  },
  env: nodeEnv,
  port: process.env.PORT as number | undefined,
};

export default serverConfig;
