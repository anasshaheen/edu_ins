import { User } from '../../../db';
import { responses, HashUtils, uploadFile } from '../../../utils';
import { IUser } from '../../../interfaces';
import { roles } from '../../../constants';

export default {
  Mutation: {
    async updateUser(
      _: any,
      { input }: { input: IUser },
      { user: { _id } }: { user: IUser },
    ) {
      input.updatedAt = new Date();
      await User.updateOne({ _id }, input);

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

      if (!(await HashUtils.comparePass(input.oldPassword, user.password))) {
        throw new Error('Password does not match.');
      }

      await user
        .updateOne({
          password: await HashUtils.hashPass(input.newPassword),
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
      await User.updateOne(
        { _id },
        {
          avatar: data.Location,
          updatedAt: new Date(),
        },
      );

      return responses.update('Avatar');
    },
    removeUser: async (
      _: any,
      { id }: { id: string },
      { user: { _id, role } }: { user: IUser },
    ) => {
      const user = <any>await User.findById(id);
      if (!user) {
        throw new Error('User not found!');
      }

      if (
        user._id === _id ||
        role === roles.SUPER_ADMIN ||
        (role === roles.ADMIN &&
          (user.role === roles.STUDENT || user.role === roles.TEACHER))
      ) {
        await user.remove();
      } else {
        if (user.role === roles.ADMIN) {
          throw new Error('Admins can be removed only by SUPER ADMIN.');
        }

        throw new Error("You're not authorized to perferm this action!");
      }

      return responses.remove('User');
    },
  },
};
