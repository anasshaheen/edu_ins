import { gql } from 'apollo-server-express';

export default gql`
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
