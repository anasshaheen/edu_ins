import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    addExam(courseId: String, input: ExamInput): ResponseOutput
      @isAuth
      @isStaffMember
    updateExam(examId: String, input: ExamInput): ResponseOutput
      @isAuth
      @isStaffMember
    removeExam(examId: String): ResponseOutput @isAuth @isStaffMember
  }
`;
