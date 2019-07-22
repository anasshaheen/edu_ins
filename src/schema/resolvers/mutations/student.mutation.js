const { User } = require('../../../db');
const { roles } = require('../../../constants');
const { responses, hash } = require('../../../utils');

module.exports = {
  Mutation: {
    addStudent: async (_, { input: { phone, email, name, password } }) => {
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
          role: roles.STUDENT,
          createdAt: new Date()
        });
        await user.save();

        const response = responses.addResponse('Student');
        response.id = user._id;

        return response;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
