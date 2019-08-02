interface RedisOptions {
  host: string | undefined;
  port: number;
}

const options: RedisOptions = {
  host: <string | undefined>process.env.REDIS_HOST,
  port: <number>parseInt(<string>process.env.REDIS_PORT),
};

export default options;
