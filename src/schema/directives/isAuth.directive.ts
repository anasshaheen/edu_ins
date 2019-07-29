import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

class IsAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = (...args: any[]) => {
      const [, , { user, isLoggedIn }] = args;
      if (!user && !isLoggedIn) {
        throw new Error('User not authenticated');
      }

      return resolve.apply(this, args);
    };
  }
}

export default IsAuthDirective;
