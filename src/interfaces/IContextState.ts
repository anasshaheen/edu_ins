import { RedisClient } from 'src/utils';
import { IUser } from '.';

interface IContextState {
  user: IUser | undefined;
  isLoggedIn: boolean;
  redisClient: RedisClient;
}

export default IContextState;
