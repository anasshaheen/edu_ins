interface RedisOptions {
  host: string | undefined;
  port: number;
}

const options: RedisOptions = {
  host: process.env.REDIS_HOST as string | undefined,
  port: parseInt(process.env.REDIS_PORT as string, 10),
};

export default options;
