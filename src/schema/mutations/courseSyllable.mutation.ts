import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    addSyllableSection(
      courseId: String!
      section: SyllableSectionInput!
    ): ResponseOutput @isAuth @isStaffMember
    updateSyllableSection(
      courseId: String
      sectionId: String
      section: SyllableSectionInput
    ): ResponseOutput @isAuth @isStaffMember
    removeSyllableSection(courseId: String, sectionId: String): ResponseOutput
      @isAuth
      @isStaffMember
  }
`;
