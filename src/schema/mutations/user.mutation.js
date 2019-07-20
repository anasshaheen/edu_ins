const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Mutation {
    uploadAvatar(file: Upload!): ResponseOutput @isAuth
    updateUser(input: UpdateUserInput): ResponseOutput @isAuth
    changePassword(input: ChangePasswordInput): ResponseOutput @isAuth
  }
`;
