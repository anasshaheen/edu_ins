import { userQueries } from '../queries';
import { userMutations } from '../mutations';
import execute from './execute';

class UserAPI {
  private static _tokens: any = {
    admin: '',
    teacher: '',
    student: '',
    invalid: '',
  };

  static async initTokens() {
    const admin = await UserAPI.authenticate('user1@gmail.com', 'password');
    const teacher = await UserAPI.authenticate('user2@gmail.com', 'password');
    const student = await UserAPI.authenticate('user3@gmail.com', 'password');

    this.setToken('admin', admin.data.data.login.token.access_token);
    this.setToken('teacher', teacher.data.data.login.token.access_token);
    this.setToken('student', student.data.data.login.token.access_token);
  }

  static setToken(role: string, value: string) {
    this._tokens[role] = value;
  }

  static getToken(role: string) {
    return this._tokens[role];
  }

  static async authenticate(email: string, password: string) {
    return await execute(userMutations.LOGIN, undefined, {
      email,
      password,
    });
  }

  static async getAdmins(role: string) {
    return await execute(userQueries.GET_ADMINS, this._tokens[role]);
  }

  static async getTeachers(role: string, page: number, limit: number) {
    return await execute(userQueries.GET_TEACHERS, this._tokens[role], {
      page,
      limit,
    });
  }

  static async getStudents(role: string, page: number, limit: number) {
    return await execute(userQueries.GET_STUDENTS, this._tokens[role], {
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
      this._tokens[role],
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
      this._tokens[role],
      userDetails,
    );
  }

  static async addTeacher(role: string, userDetails: object) {
    return await execute(
      userMutations.ADD_TEACHER,
      this._tokens[role],
      userDetails,
    );
  }

  static async addStudent(role: string, userDetails: object) {
    return await execute(
      userMutations.ADD_STUDENT,
      this._tokens[role],
      userDetails,
    );
  }

  static async updateUserDetails(role: string, userDetails: object) {
    return await execute(
      userMutations.UPDATE_USER_DETAILS,
      this._tokens[role],
      userDetails,
    );
  }

  static async changePassword(role: string, userDetails: object) {
    return await execute(
      userMutations.CHANGE_PASSWORD,
      this._tokens[role],
      userDetails,
    );
  }

  static async removeUser(role: string, id: string) {
    return await execute(userMutations.REMOVE_USER, this._tokens[role], {
      id,
    });
  }
}

export default UserAPI;
