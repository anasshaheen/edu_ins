const { gql } = require('apollo-server-express');

module.exports = gql`
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
