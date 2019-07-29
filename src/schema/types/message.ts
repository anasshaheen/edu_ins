import { gql } from 'apollo-server-express';

export default gql`
  type Message {
    id: ID!
    body: String
    user: User
    course: Course
    createdAt: String
  }
`;
