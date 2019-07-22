const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Mutation {
    addStudent(input: AddUserInput): ResponseOutput @isAuth @isAdmin
  }
`;
