import { User } from '../../../db';
import { compare, generateToken } from '../../../utils';
import { jsonWebToken } from '../../../config';
import { ILogin } from '../../../interfaces';

export default {
  Mutation: {
    login: async (
      _: any,
      { input: { email, password } }: { input: ILogin },
    ) => {
      const user = <any>await User.findOne({ email });
      if (!user) {
        throw new Error('User not found!');
      }

      if (!(await compare(password, user.password))) {
        throw new Error('Email or password are wrong!');
      }

      return {
        token: {
          access_token: generateToken({ email: user.email }),
          expires_in: jsonWebToken.options.expiresIn,
        },
        user,
      };
    },
  },
};
