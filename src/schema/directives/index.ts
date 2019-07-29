import { gql } from 'apollo-server-express';

import IsAuthDirective from './isAuth.directive';
import IsStaffMemberDirective from './isStaffMember.directive';
import IsAdminDirective from './isAdmin.directive';

const schema = gql`
  directive @isAuth on FIELD_DEFINITION
  directive @isAdmin on FIELD_DEFINITION
  directive @isStaffMember on FIELD_DEFINITION
`;

const schemaDirectives = {
  isAuth: IsAuthDirective,
  isAdmin: IsAdminDirective,
  isStaffMember: IsStaffMemberDirective,
};

export { schema, schemaDirectives };
