const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    students(paging: PaginationInput): [User] @isAuth @isStaffMember
    searchForStudent(paging: PaginationInput, query: String): [User]
      @isAuth
      @isStaffMember
  }
`;
