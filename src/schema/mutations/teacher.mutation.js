const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Mutation {
    addTeacher(input: AddUserInput): ResponseOutput @isAuth @isAdmin
  }
`;
