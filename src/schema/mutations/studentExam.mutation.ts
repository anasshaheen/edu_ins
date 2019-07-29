import { gql } from 'apollo-server-express';

export default gql`
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
