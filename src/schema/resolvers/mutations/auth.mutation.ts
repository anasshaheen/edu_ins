import { User } from '../../../db';
import { HashUtils, TokenUtils } from '../../../utils';
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
        throw new Error('Email or password are wrong!');
      }

      if (!(await HashUtils.comparePass(password, user.password))) {
        throw new Error('Email or password are wrong!');
      }

      return {
        token: {
          access_token: TokenUtils.generate({ email: user.email }),
          expires_in: jsonWebToken.options.expiresIn,
        },
        user,
      };
    },
  },
};
