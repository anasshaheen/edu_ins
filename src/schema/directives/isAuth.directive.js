const { SchemaDirectiveVisitor } = require('apollo-server-express');
const { defaultFieldResolver } = require('graphql');

class IsAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = (...args) => {
      const [, , { user, isLoggedIn }] = args;
      if (!user && !isLoggedIn) {
        throw new Error('User not authenticated');
      }

      return resolve.apply(this, args);
    };
  }
}

module.exports = IsAuthDirective;
