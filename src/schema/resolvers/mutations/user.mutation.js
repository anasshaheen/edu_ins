const { User } = require('../../../db');
const { responses, hash, compare, uploadFile } = require('../../../utils');

module.exports = {
  Mutation: {
    updateUser: async (
      _,
      { input },
      {
        ctx: {
          user: { _id }
        }
      }
    ) => {
      try {
        await User.findByIdAndUpdate(_id, input);

        return responses.updateResponse('User');
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    changePassword: async (
      _,
      { input: { oldPassword, newPassword } },
      {
        ctx: {
          user: { _id }
        }
      }
    ) => {
      const user = await User.findById(_id);
      if (!user) {
        throw new Error('User not found!');
      }

      if (!(await compare(oldPassword, user.password))) {
        throw new Error('Password does not match.');
      }

      await user
        .update({
          password: await hash(newPassword)
        })
        .exec();

      return responses.updateResponse('Password');
    },
    uploadAvatar: async (_, { file }, { user: { _id } }) => {
      try {
        const { createReadStream, mimetype } = await file;
        const stream = createReadStream();

        const data = await uploadFile(`${_id}${mimetype}`, stream);
        await User.findByIdAndUpdate(_id, {
          avatar: data.Location
        });

        return responses.updateResponse('Avatar');
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
