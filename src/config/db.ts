import HostingEnvironment from '../utils/hostingEnvironment';

interface DBOptions {
  DATABASE_URI: string;
}

const dbOptions: DBOptions = {
  DATABASE_URI: HostingEnvironment.isTesting(<string>process.env.NODE_ENV)
    ? <string>process.env.TEST_DATABASE_URI
    : <string>process.env.DATABASE_URI,
};

export default dbOptions;
