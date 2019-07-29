import { User } from '../../../db';
import { responses, hash, compare, uploadFile } from '../../../utils';
import { IUser } from '../../../interfaces';

export default {
  Mutation: {
    async updateUser(
      _: any,
      { input }: { input: IUser },
      { user: { _id } }: { user: IUser },
    ) {
      input.updatedAt = new Date();
      await User.findByIdAndUpdate(_id, input);

      return responses.update('User');
    },
    async changePassword(
      _: any,
      { input }: { input: { oldPassword: string; newPassword: string } },
      { user: { _id } }: { user: IUser },
    ) {
      const user = <any>await User.findById(_id);
      if (!user) {
        throw new Error('User not found!');
      }

      if (!(await compare(input.oldPassword, user.password))) {
        throw new Error('Password does not match.');
      }

      await user
        .update({
          password: await hash(input.newPassword),
          updatedAt: new Date(),
        })
        .exec();

      return responses.update('Password');
    },
    async uploadAvatar(
      _: any,
      { file }: { file: any },
      { user: { _id } }: { user: IUser },
    ) {
      const { createReadStream, mimetype } = await file;
      const stream = createReadStream();

      const data = await uploadFile(`${_id}${mimetype}`, stream);
      await User.findByIdAndUpdate(_id, {
        avatar: data.Location,
        updatedAt: new Date(),
      });

      return responses.update('Avatar');
    },
    removeUser: async (_: any, { id }: { id: string }) => {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found!');
      }

      await user.remove();

      return responses.remove('User');
    },
  },
};
