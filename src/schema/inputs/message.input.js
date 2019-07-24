const { gql } = require('apollo-server-express');

module.exports = gql`
  input MessageInput {
    body: String!
  }
`;
