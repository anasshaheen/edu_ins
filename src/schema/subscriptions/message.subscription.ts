import { gql } from 'apollo-server-express';

export default gql`
  extend type Subscription {
    messageAdded(courseId: String!): Message @isAuth
  }
`;
