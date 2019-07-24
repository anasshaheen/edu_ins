const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    examMarks(paging: PaginationInput, examId: String): ExamMarkPaginatedResult
      @isAuth
      @isStaffMember
    studentExamMarks(
      paging: PaginationInput
      studentId: String
    ): ExamMarkPaginatedResult @isAuth
    examMark(examId: String, studentId: String): ExamMark @isAuth
  }
`;
