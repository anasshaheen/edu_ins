import { User } from '../../../db';
import { roles } from '../../../constants';
import { responses, HashUtils } from '../../../utils';
import { IAdmin } from '../../../interfaces';

export default {
  Mutation: {
    addAdmin: async (
      _: any,
      { input: { phone, email, name, password } }: { input: IAdmin },
    ) => {
      let user = await User.findOne({
        $or: [{ phone }, { email }],
      });
      if (user) {
        throw new Error('User is already exists!');
      }

      await User.create({
        name,
        email,
        phone,
        password: await HashUtils.hashPass(password),
        role: roles.ADMIN,
        createdAt: new Date(),
      });

      return responses.add('Admin');
    },
  },
};
