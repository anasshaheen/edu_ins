const { gql } = require('apollo-server-express');

module.exports = gql`
  type ResponseOutput {
    message: String!
    code: Int!
    id: String
  }
`;
