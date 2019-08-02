import HostingEnvironment from '../utils/hostingEnvironment';

interface DBOptions {
  DATABASE_URI: string;
}

const dbOptions: DBOptions = {
  DATABASE_URI: HostingEnvironment.isTesting(process.env.NODE_ENV as string)
    ? (process.env.TEST_DATABASE_URI as string)
    : (process.env.DATABASE_URI as string),
};

export default dbOptions;
