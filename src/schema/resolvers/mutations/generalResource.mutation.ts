import { GeneralResource } from '../../../db';
import { responses } from '../../../utils';
import { IGeneralResource, IUser, IContextState } from '../../../interfaces';

export default {
  Mutation: {
    async addGeneralResource(
      _: object,
      { input }: { input: IGeneralResource },
      { user }: IContextState,
    ) {
      input.user = (user as IUser)._id;
      input.createdAt = new Date();
      await GeneralResource.create(input);

      return responses.add('Resource');
    },
    async updateGeneralResource(
      _: object,
      { id, input }: { id: string; input: IGeneralResource },
    ) {
      const resource = await GeneralResource.findById(id);
      if (!resource) {
        throw new Error('Resource not found!');
      }

      await resource.updateOne({
        title: input.title,
        description: input.description,
        url: input.url,
      });

      return responses.update('Resource');
    },
    async removeGeneralResource(_: object, { id }: { id: string }) {
      const resource = await GeneralResource.findById(id);
      if (!resource) {
        throw new Error('Resource not found!');
      }

      await resource.remove();

      return responses.remove('Resource');
    },
  },
};
