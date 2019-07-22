const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Mutation {
    addExam(courseId: String, exam: ExamInput): ResponseOutput
      @isAuth
      @isStaffMember
    updateExam(
      courseId: String
      examId: String
      exam: ExamInput
    ): ResponseOutput @isAuth @isStaffMember
    removeExam(courseId: String, examId: String): ResponseOutput
      @isAuth
      @isStaffMember
  }
`;
