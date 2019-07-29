interface DBOptions {
  DATABASE_URI: string;
}

const dbOptions: DBOptions = {
  DATABASE_URI: <string>process.env.DATABASE_URI,
};

export default dbOptions;
