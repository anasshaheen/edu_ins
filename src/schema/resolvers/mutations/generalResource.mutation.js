const { GeneralResource } = require('../../../db');
const { responses } = require('../../../utils');

module.exports = {
  Mutation: {
    async addGeneralResource(
      _,
      { input },
      {
        user: { _id }
      }
    ) {
      try {
        input.user = _id;
        input.createdAt = new Date();
        const resource = new GeneralResource(input);
        await resource.save();

        return responses.addResponse('Resource');
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async updateGeneralResource(_, { id, input }) {
      try {
        const resource = await GeneralResource.findById(id);
        if (!resource) {
          throw new Error('Resource not found!');
        }

        resource.title = input.title;
        resource.description = input.description;
        resource.url = input.url;

        await resource.save();

        return responses.updateResponse('Resource');
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async removeGeneralResource(_, { id }) {
      try {
        const resource = await GeneralResource.findById(id);
        if (!resource) {
          throw new Error('Resource not found!');
        }

        await resource.remove();

        return responses.removeResponse('Resource');
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
