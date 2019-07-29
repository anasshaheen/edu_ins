import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    admins: [User] @isAuth @isAdmin
  }
`;
