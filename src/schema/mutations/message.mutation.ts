import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    sendMessageToCourse(courseId: String, input: MessageInput): ResponseOutput
      @isAuth
  }
`;
