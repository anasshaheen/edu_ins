import { User } from '../../../db';
import { roles } from '../../../constants';
import { responses, HashUtils } from '../../../utils';
import { IUser } from '../../../interfaces';

export default {
  Mutation: {
    addTeacher: async (_: object, { input }: { input: IUser }) => {
      const user = await User.findOne({
        $or: [{ phone: input.phone }, { email: input.email }],
      });
      if (user) {
        throw new Error('User is already exists!');
      }

      input.password = await HashUtils.hashPass(input.password);
      input.role = roles.TEACHER;
      input.createdAt = new Date();
      await User.create(input);

      return responses.add('Teacher');
    },
  },
};
