import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    teachers(paging: PaginationInput): UserPaginatedResult @isAuth @isAdmin
  }
`;
