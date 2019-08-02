import { User } from '../../../db';
import { HashUtils, TokenUtils } from '../../../utils';
import { jsonWebToken } from '../../../config';
import { ILogin } from '../../../interfaces';

export default {
  Mutation: {
    login: async (
      _: object,
      { input: { email, password } }: { input: ILogin },
    ) => {
      const user = await User.findOne({ email }).exec();
      if (!user) {
        throw new Error('Email or password are wrong!');
      }

      if (!(await HashUtils.comparePass(password, user.get('password')))) {
        throw new Error('Email or password are wrong!');
      }

      return {
        token: {
          access_token: TokenUtils.generate({ email: user.get('email') }),
          expires_in: jsonWebToken.options.expiresIn,
        },
        user,
      };
    },
  },
};
