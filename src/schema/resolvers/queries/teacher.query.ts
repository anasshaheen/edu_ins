import { User } from '../../../db';

import { roles } from '../../../constants';
import { IPaging } from '../../../interfaces';

export default {
  Query: {
    teachers: async (
      _: object,
      { paging: { page = 1, limit = 10 } }: { paging: IPaging },
    ) => {
      const data = await User.find()
        .sort({
          createdAt: 'desc',
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .where({
          role: roles.TEACHER,
        })
        .exec();

      return {
        data,
        page,
        limit,
        totalRecords: await User.countDocuments({
          role: roles.TEACHER,
        }).exec(),
      };
    },
  },
};
