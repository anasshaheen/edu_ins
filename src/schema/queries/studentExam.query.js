const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    examMarks(paging: PaginationInput, examId: String): [ExamMark]
      @isAuth
      @isStaffMember
    studentExamMarks(paging: PaginationInput, studentId: String): [ExamMark]
      @isAuth
    examMark(examId: String, studentId: String): ExamMark @isAuth
  }
`;
