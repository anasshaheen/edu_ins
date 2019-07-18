const { SchemaDirectiveVisitor } = require('apollo-server-express');
const { defaultFieldResolver } = require('graphql');

const { roles } = require('../../constants');

class IsAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = (...args) => {
      const [, , { user }] = args;
      if (!user) {
        throw new Error('User not authenticated');
      }

      if (user.role !== roles.ADMIN) {
        throw new Error('User is not authorized');
      }

      return resolve.apply(this, args);
    };
  }
}

module.exports = IsAuthDirective;
