import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: ID!
    avatar: String
    phone: String
    email: String
    name: String
    role: String
    createdAt: String
    updatedAt: String
  }
`;
