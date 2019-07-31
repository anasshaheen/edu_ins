import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

import { roles } from '../../constants';

class IsAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = (...args: any[]) => {
      const [, , { user }] = args;
      if (!user) {
        throw new Error('User not authenticated');
      }

      if (
        user.role !== roles.ADMIN &&
        user.role !== roles.TEACHER &&
        user.role !== roles.SUPER_ADMIN
      ) {
        throw new Error('User is not authorized');
      }

      return resolve.apply(this, args);
    };
  }
}

export default IsAuthDirective;
