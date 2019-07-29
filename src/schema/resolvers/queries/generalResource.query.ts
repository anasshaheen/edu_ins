import { GeneralResource } from '../../../db';
import { IPaging } from '../../../interfaces';

export default {
  Query: {
    async generalResources(
      _: any,
      { paging: { page = 1, limit = 10 } }: { paging: IPaging },
    ) {
      const data = await GeneralResource.find()
        .sort({
          createdAt: 'desc',
        })
        .skip(limit * (page - 1))
        .limit(limit)
        .populate('user')
        .exec();

      return {
        data,
        page,
        limit,
        totalRecords: GeneralResource.countDocuments().exec(),
      };
    },
    async generalResource(_: any, { id }: { id: string }) {
      return await GeneralResource.findById(id)
        .populate('user')
        .exec();
    },
  },
};
