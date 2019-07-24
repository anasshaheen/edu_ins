const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Mutation {
    sendMessageToCourse(courseId: String, input: MessageInput): ResponseOutput
      @isAuth
  }
`;
