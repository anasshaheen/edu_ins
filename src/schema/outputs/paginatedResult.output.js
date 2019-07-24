const { gql } = require('apollo-server-express');

module.exports = gql`
  interface PaginatedResult {
    page: Int!
    limit: Int!
    totalRecords: Int!
  }

  type UserPaginatedResult implements PaginatedResult {
    page: Int!
    limit: Int!
    totalRecords: Int!
    data: [User]!
  }

  type CoursePaginatedResult implements PaginatedResult {
    page: Int!
    limit: Int!
    totalRecords: Int!
    data: [Course]!
  }

  type ExamPaginatedResult implements PaginatedResult {
    page: Int!
    limit: Int!
    totalRecords: Int!
    data: [Exam]!
  }

  type GeneralResourcePaginatedResult implements PaginatedResult {
    page: Int!
    limit: Int!
    totalRecords: Int!
    data: [GeneralResource]!
  }

  type MessagePaginatedResult implements PaginatedResult {
    page: Int!
    limit: Int!
    totalRecords: Int!
    data: [Message]!
  }

  type ExamMarkPaginatedResult implements PaginatedResult {
    page: Int!
    limit: Int!
    totalRecords: Int!
    data: [ExamMark]!
  }
`;
