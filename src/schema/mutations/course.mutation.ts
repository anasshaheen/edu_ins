import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    addCourse(input: CourseInput): ResponseOutput @isAuth @isAdmin
    updateCourse(id: String, input: UpdateCourseInput): ResponseOutput
      @isAuth
      @isStaffMember
    removeCourse(id: String): ResponseOutput @isAuth @isAdmin
    updateCourseTeachers(id: String, teachers: [String]!): ResponseOutput
      @isAuth
      @isAdmin
    addStudentsToCourse(courseId: String, students: [String]!): ResponseOutput
      @isAuth
      @isAdmin
    removeStudentsFromCourse(
      courseId: String
      students: [String]!
    ): ResponseOutput @isAuth @isAdmin
  }
`;
