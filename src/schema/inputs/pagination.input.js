const { gql } = require('apollo-server-express');

module.exports = gql`
  input PaginationInput {
    page: Int
    limit: Int
  }
`;
