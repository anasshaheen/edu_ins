const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    courseMessages(
      courseId: String
      paging: PaginationInput
    ): MessagePaginatedResult @isAuth
  }
`;
