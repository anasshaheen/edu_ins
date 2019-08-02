import { gql } from 'apollo-server-express';

export default gql`
  type Course {
    id: ID!
    name: String!
    description: String
    syllable: Syllable
    teachers: [User]
    resources: [Resource]
    createdAt: String
    updatedAt: String
  }
`;
