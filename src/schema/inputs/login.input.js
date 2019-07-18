const { gql } = require('apollo-server-express');

module.exports = gql`
  input LoginInput {
    email: String
    password: String
  }
`;
