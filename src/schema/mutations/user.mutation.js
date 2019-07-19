const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Mutation {
    uploadAvatar(file: Upload!): File! @isAuth
    updateUser(input: UpdateUserInput): ResponseOutput @isAuth
    changePassword(input: ChangePasswordInput): ResponseOutput @isAuth
    forgotPassword(input: ForgotPasswordInput): ResponseOutput @isAuth
  }
`;
