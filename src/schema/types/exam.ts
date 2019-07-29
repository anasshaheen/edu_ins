import { gql } from 'apollo-server-express';

export default gql`
  type Exam {
    id: ID!
    name: String
    description: String
    grade: Float
    author: User
    createdAt: String
  }
`;
