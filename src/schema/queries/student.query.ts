import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    students(paging: PaginationInput): UserPaginatedResult
      @isAuth
      @isStaffMember
    searchForStudent(
      paging: PaginationInput
      query: String
    ): UserPaginatedResult @isAuth @isStaffMember
  }
`;
