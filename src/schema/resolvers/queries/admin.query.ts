import { User } from '../../../db';

import { roles } from '../../../constants';

export default {
  Query: {
    async admins() {
      return await User.find({
        role: roles.ADMIN,
      });
    },
  },
};
