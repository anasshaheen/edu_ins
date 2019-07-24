const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    generalResources(paging: PaginationInput): GeneralResourcePaginatedResult
      @isAuth
    generalResource(id: String): GeneralResource @isAuth
  }
`;
