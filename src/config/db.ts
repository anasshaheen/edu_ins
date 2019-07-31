import HostingEnvironment from '../utils/hostingEnvironment';

interface DBOptions {
  DATABASE_URI: string;
}

const dbOptions: DBOptions = {
  DATABASE_URI: HostingEnvironment.isTesting(<string>process.env.NODE_ENV)
    ? 'mongodb://localhost:27017/edu_ins_test' //<string>process.env.TEST_DATABASE_URI
    : <string>process.env.DATABASE_URI,
};

export default dbOptions;
