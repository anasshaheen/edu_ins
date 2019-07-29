interface ServerConfig {
  apollo: ApolloConfig;
  port: number | undefined;
}

interface ApolloConfig {
  introspection: boolean;
  playground: boolean;
}

const serverConfig: ServerConfig = {
  apollo: {
    introspection: process.env.INTROSPECTION === 'TRUE',
    playground: process.env.PLAYGROUND === 'TRUE',
  },
  port: <number | undefined>process.env.PORT,
};

export default serverConfig;
