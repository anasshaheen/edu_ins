import { gql } from 'apollo-server-express';

export default gql`
  type GeneralResource {
    id: ID!
    title: String
    description: String
    url: String
    user: User
    createdAt: String
  }
`;
