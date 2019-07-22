const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Mutation {
    addAdmin(input: AddUserInput): ResponseOutput @isAuth @isAdmin
  }
`;
