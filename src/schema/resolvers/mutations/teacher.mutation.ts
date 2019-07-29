import { User } from '../../../db';
import { roles } from '../../../constants';
import { responses, hash } from '../../../utils';
import { IUser } from '../../../interfaces';

export default {
  Mutation: {
    addTeacher: async (_: any, { input }: { input: IUser }) => {
      let user = await User.findOne({
        $or: [{ phone: input.phone }, { email: input.email }],
      });
      if (user) {
        throw new Error('User is already exists!');
      }

      input.password = await hash(input.password);
      input.role = roles.TEACHER;
      input.createdAt = new Date();
      await User.create(input);

      return responses.add('Teacher');
    },
  },
};
