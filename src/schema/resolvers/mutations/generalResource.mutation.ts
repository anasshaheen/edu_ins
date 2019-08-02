import { GeneralResource } from '../../../db';
import { responses } from '../../../utils';
import { IGeneralResource, IUser, IContextState } from '../../../interfaces';

export default {
  Mutation: {
    async addGeneralResource(
      _: any,
      { input }: { input: IGeneralResource },
      { user }: IContextState,
    ) {
      input.user = (<IUser>user)._id;
      input.createdAt = new Date();
      const resource = new GeneralResource(input);
      await resource.save();

      return responses.add('Resource');
    },
    async updateGeneralResource(
      _: any,
      { id, input }: { id: string; input: IGeneralResource },
    ) {
      const resource = <any>await GeneralResource.findById(id);
      if (!resource) {
        throw new Error('Resource not found!');
      }

      resource.title = input.title;
      resource.description = input.description;
      resource.url = input.url;

      await resource.save();

      return responses.update('Resource');
    },
    async removeGeneralResource(_: any, { id }: { id: string }) {
      const resource = await GeneralResource.findById(id);
      if (!resource) {
        throw new Error('Resource not found!');
      }

      await resource.remove();

      return responses.remove('Resource');
    },
  },
};
