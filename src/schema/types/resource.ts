import { gql } from 'apollo-server-express';

export default gql`
  type Resource {
    id: ID!
    title: String
    description: String
    url: String
    user: User
  }
`;
