const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    students(paging: PaginationInput): [User] @isAuth @isAdmin
  }
`;
