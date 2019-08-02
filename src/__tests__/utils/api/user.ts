import { userQueries } from '../queries';
import { userMutations } from '../mutations';
import execute from './execute';

class UserAPI {
  private static tokens: Map<string, string> = new Map<string, string>();

  static async initTokens() {
    const admin = await UserAPI.authenticate('user1@gmail.com', 'password');
    const teacher = await UserAPI.authenticate('user2@gmail.com', 'password');
    const student = await UserAPI.authenticate('user3@gmail.com', 'password');

    this.setToken('admin', admin.data.data.login.token.access_token);
    this.setToken('teacher', teacher.data.data.login.token.access_token);
    this.setToken('student', student.data.data.login.token.access_token);
  }

  static setToken(role: string, value: string) {
    this.tokens.set(role, value);
  }

  static getToken(role: string) {
    return this.tokens.get(role);
  }

  static async authenticate(email: string, password: string) {
    return await execute(userMutations.LOGIN, undefined, {
      email,
      password,
    });
  }

  static async getAdmins(role: string) {
    return await execute(userQueries.GET_ADMINS, this.tokens.get(role));
  }

  static async getTeachers(role: string, page: number, limit: number) {
    return await execute(userQueries.GET_TEACHERS, this.tokens.get(role), {
      page,
      limit,
    });
  }

  static async getStudents(role: string, page: number, limit: number) {
    return await execute(userQueries.GET_STUDENTS, this.tokens.get(role), {
      page,
      limit,
    });
  }

  static async searchForStudents(
    role: string,
    query: string,
    page: number,
    limit: number,
  ) {
    return await execute(
      userQueries.GET_SEARCH_FOR_STUDENTS,
      this.tokens.get(role),
      {
        query,
        page,
        limit,
      },
    );
  }

  static async addAdmin(role: string, userDetails: object) {
    return await execute(
      userMutations.ADD_ADMIN,
      this.tokens.get(role),
      userDetails,
    );
  }

  static async addTeacher(role: string, userDetails: object) {
    return await execute(
      userMutations.ADD_TEACHER,
      this.tokens.get(role),
      userDetails,
    );
  }

  static async addStudent(role: string, userDetails: object) {
    return await execute(
      userMutations.ADD_STUDENT,
      this.tokens.get(role),
      userDetails,
    );
  }

  static async updateUserDetails(role: string, userDetails: object) {
    return await execute(
      userMutations.UPDATE_USER_DETAILS,
      this.tokens.get(role),
      userDetails,
    );
  }

  static async changePassword(role: string, userDetails: object) {
    return await execute(
      userMutations.CHANGE_PASSWORD,
      this.tokens.get(role),
      userDetails,
    );
  }

  static async removeUser(role: string, id: string) {
    return await execute(userMutations.REMOVE_USER, this.tokens.get(role), {
      id,
    });
  }
}

export default UserAPI;
