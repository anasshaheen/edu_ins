import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    uploadAvatar(file: Upload!): ResponseOutput @isAuth
    updateUser(input: UpdateUserInput): ResponseOutput @isAuth
    changePassword(input: ChangePasswordInput): ResponseOutput @isAuth
    removeUser(id: String): ResponseOutput @isAuth @isAdmin
  }
`;
