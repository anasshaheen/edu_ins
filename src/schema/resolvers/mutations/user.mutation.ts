import { User } from '../../../db';
import { responses, HashUtils, uploadFile } from '../../../utils';
import { IUser, IContextState } from '../../../interfaces';
import { roles } from '../../../constants';

export default {
  Mutation: {
    async updateUser(
      _: any,
      { input }: { input: IUser },
      { user }: IContextState,
    ) {
      input.updatedAt = new Date();
      await User.updateOne({ _id: (<IUser>user)._id }, input);

      return responses.update('User');
    },
    async changePassword(
      _: any,
      { input }: { input: { oldPassword: string; newPassword: string } },
      { user }: IContextState,
    ) {
      const userToUpdate = <any>await User.findById((<IUser>user)._id);
      if (!userToUpdate) {
        throw new Error('User not found!');
      }

      if (
        !(await HashUtils.comparePass(input.oldPassword, userToUpdate.password))
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
      _: any,
      { file }: { file: any },
      { user }: IContextState,
    ) {
      const { createReadStream, mimetype } = await file;
      const stream = createReadStream();

      const data = await uploadFile(`${(<IUser>user)._id}${mimetype}`, stream);
      await User.updateOne(
        { _id: (<IUser>user)._id },
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
      { user }: IContextState,
    ) => {
      const userToUpdate = <any>await User.findById(id);
      if (!userToUpdate) {
        throw new Error('User not found!');
      }

      if (
        userToUpdate._id === (<IUser>user)._id ||
        (<IUser>user).role === roles.SUPER_ADMIN ||
        ((<IUser>user).role === roles.ADMIN &&
          (userToUpdate.role === roles.STUDENT ||
            userToUpdate.role === roles.TEACHER))
      ) {
        await userToUpdate.remove();
      } else {
        if (userToUpdate.role === roles.ADMIN) {
          throw new Error('Admins can be removed only by SUPER ADMIN.');
        }

        throw new Error("You're not authorized to perferm this action!");
      }

      return responses.remove('User');
    },
  },
};
