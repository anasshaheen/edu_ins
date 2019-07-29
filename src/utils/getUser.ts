const { User } = require('../db');

export default async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    return { user: undefined, isLoggedIn: false };
  }

  return { user, isLoggedIn: true };
};
