import { User } from '../db';
import { IAuthState } from '../interfaces';

async function getUser(email: string): Promise<IAuthState> {
  const user = await User.findOne({ email }).exec();
  if (!user) {
    return { user: undefined, isLoggedIn: false };
  }

  return { user, isLoggedIn: true };
}

export default getUser;
