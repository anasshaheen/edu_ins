import { User } from '../../db';
import { users } from './data';

class DataSeeder {
  async seedUsers() {
    await User.insertMany(users);
  }
}

export default DataSeeder;
