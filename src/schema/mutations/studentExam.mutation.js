const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Mutation {
    addExamMarks(examId: String, input: [StudentExamInput]!): ResponseOutput
      @isAuth
      @isStaffMember
    updateExamMark(examId: String, input: StudentExamInput!): ResponseOutput
      @isAuth
      @isStaffMember
    removeExamMark(examId: String!, studentId: String!): ResponseOutput
      @isAuth
      @isStaffMember
  }
`;
