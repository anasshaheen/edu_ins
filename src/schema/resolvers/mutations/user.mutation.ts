import { User } from '../../../db';
import { responses, HashUtils, uploadFile } from '../../../utils';
import { IUser, IContextState } from '../../../interfaces';
import { roles } from '../../../constants';

export default {
  Mutation: {
    async updateUser(
      _: object,
      { input }: { input: IUser },
      { user }: IContextState,
    ) {
      input.updatedAt = new Date();
      await User.updateOne({ _id: (user as IUser)._id }, input);

      return responses.update('User');
    },
    async changePassword(
      _: object,
      { input }: { input: { oldPassword: string; newPassword: string } },
      { user }: IContextState,
    ) {
      const userToUpdate = await User.findById((user as IUser)._id);
      if (!userToUpdate) {
        throw new Error('User not found!');
      }

      if (
        !(await HashUtils.comparePass(
          input.oldPassword,
          userToUpdate.get('password'),
        ))
      ) {
        throw new Error('Password does not match.');
      }

      await userToUpdate
        .updateOne({
          password: await HashUtils.hashPass(input.newPassword),
          updatedAt: new Date(),
        })
        .exec();

      return responses.update('Password');
    },
    async uploadAvatar(
      _: object,
      { file }: { file: any },
      { user }: IContextState,
    ) {
      const { createReadStream, mimetype } = await file;
      const stream = createReadStream();

      const data = await uploadFile(
        `${(user as IUser)._id}${mimetype}`,
        stream,
      );
      await User.updateOne(
        { _id: (user as IUser)._id },
        {
          avatar: data.Location,
          updatedAt: new Date(),
        },
      );

      return responses.update('Avatar');
    },
    removeUser: async (
      _: object,
      { id }: { id: string },
      { user }: IContextState,
    ) => {
      const userToUpdate = await User.findById(id);
      if (!userToUpdate) {
        throw new Error('User not found!');
      }

      if (
        userToUpdate._id === (user as IUser)._id ||
        (user as IUser).role === roles.SUPER_ADMIN ||
        ((user as IUser).role === roles.ADMIN &&
          (userToUpdate.get('role') === roles.STUDENT ||
            userToUpdate.get('role') === roles.TEACHER))
      ) {
        await userToUpdate.remove();
      } else {
        if (userToUpdate.get('role') === roles.ADMIN) {
          throw new Error('Admins can be removed only by SUPER ADMIN.');
        }

        throw new Error('You are not authorized to perferm this action!');
      }

      return responses.remove('User');
    },
  },
};
