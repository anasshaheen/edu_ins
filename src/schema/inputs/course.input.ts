import { gql } from 'apollo-server-express';

export default gql`
  input CourseInput {
    name: String!
    description: String!
    syllable: SyllableInput!
    teachers: [String]!
  }

  input UpdateCourseInput {
    name: String
    description: String
  }

  input SyllableInput {
    sections: [SyllableSectionInput]!
  }

  input SyllableSectionInput {
    title: String!
    description: String!
  }

  input ResourceInput {
    title: String!
    description: String!
    url: String!
  }

  input ExamInput {
    name: String
    description: String
    grade: Float
  }
`;
