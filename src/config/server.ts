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

const nodeEnv = <string>process.env.NODE_ENV;
const enablePlaygound = HostingEnvironment.isDevelopment(nodeEnv);
const serverConfig: ServerConfig = {
  apollo: {
    introspection: enablePlaygound,
    playground: enablePlaygound,
    tracing: enablePlaygound,
  },
  env: nodeEnv,
  port: <number | undefined>process.env.PORT,
};

export default serverConfig;
