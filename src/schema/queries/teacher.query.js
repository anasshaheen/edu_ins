const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    teachers(paging: PaginationInput): [User] @isAuth @isAdmin
  }
`;
