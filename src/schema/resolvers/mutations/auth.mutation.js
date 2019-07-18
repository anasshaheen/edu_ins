const { User } = require('../../../db');

const { compare, generateToken } = require('../../../utils');
const {
  jsonWebToken: {
    options: { expiresIn }
  }
} = require('../../../config');

module.exports = {
  Mutation: {
    login: async (_, { input: { email, password } }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found!');
      }

      if (!(await compare(password, user.password))) {
        throw new Error('Email or password are wrong!');
      }

      return {
        token: {
          access_token: generateToken({ email: user.email }),
          expires_in: expiresIn
        },
        user
      };
    }
  }
};
