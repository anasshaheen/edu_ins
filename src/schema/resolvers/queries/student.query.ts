import { User } from '../../../db';
import { roles } from '../../../constants';
import { IPaging } from '../../../interfaces';

export default {
  Query: {
    async students(
      _: object,
      { paging: { page = 1, limit = 10 } }: { paging: IPaging },
    ) {
      const data = await User.find()
        .sort({
          createdAt: 'desc',
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .where({
          role: roles.STUDENT,
        })
        .exec();

      return {
        data,
        page,
        limit,
        totalRecords: await User.countDocuments({
          role: roles.STUDENT,
        }).exec(),
      };
    },
    async searchForStudent(
      _: object,
      {
        paging: { page = 1, limit = 10 },
        query,
      }: { paging: IPaging; query: string },
    ) {
      const data = await User.find()
        .sort({
          createdAt: 'desc',
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .where({
          $or: [
            { phone: new RegExp(query, 'i') },
            { name: new RegExp(query, 'i') },
          ],
          $and: [{ role: roles.STUDENT }],
        })
        .exec();

      return {
        data,
        page,
        limit,
        totalRecords: await User.countDocuments({
          $or: [
            { phone: new RegExp(query, 'i') },
            { name: new RegExp(query, 'i') },
          ],
          $and: [{ role: roles.STUDENT }],
        }).exec(),
      };
    },
  },
};
