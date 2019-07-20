const { gql } = require('apollo-server-express');

module.exports = gql`
  input AddUserInput {
    phone: String!
    email: String!
    name: String!
    password: String!
  }

  input UpdateUserInput {
    phone: String
    email: String
    name: String
  }

  input ChangePasswordInput {
    oldPassword: String!
    newPassword: String!
  }
`;
