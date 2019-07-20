const { User } = require('../../../db');
const { roles } = require('../../../constants');
const { responses, hash } = require('../../../utils');

module.exports = {
  Mutation: {
    addAdmin: async (_, { input: { phone, email, name, password } }) => {
      try {
        let user = await User.findOne({
          $or: [{ phone }, { email }]
        });
        if (user) {
          throw new Error('User is already exists!');
        }

        user = new User({
          name,
          email,
          phone,
          passowrd: await hash(password),
          role: roles.ADMIN
        });
        await user.save();

        const response = responses.addResponse('Admin');
        response.id = user._id;

        return response;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    removeAdmin: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error('User not found!');
        }

        await User.findByIdAndDelete(id);

        return responses.removeResponse('Admin');
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
