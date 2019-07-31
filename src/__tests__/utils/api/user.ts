import axios from 'axios';

import constants from '../constants';
import { userQueries } from '../queries';
import { userMutations } from '../mutations';

class UserAPI {
  private static _apiUrl: string = constants.API_URL;
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
    return await axios.post(this._apiUrl, {
      query: userMutations.LOGIN,
      variables: {
        email,
        password,
      },
    });
  }

  private static async execute(
    query: string,
    role: string = '',
    variables: any = {},
  ) {
    return await axios.post(
      this._apiUrl,
      {
        query: query,
        variables: variables,
      },
      {
        headers: {
          authorization: `bearer ${this._tokens[role]}`,
        },
      },
    );
  }

  static async getAdmins(role: string) {
    return await this.execute(userQueries.GET_ADMINS, role);
  }

  static async getTeachers(role: string, page: number, limit: number) {
    return await this.execute(userQueries.GET_TEACHERS, role, {
      page,
      limit,
    });
  }

  static async getStudents(role: string, page: number, limit: number) {
    return await this.execute(userQueries.GET_STUDENTS, role, {
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
    return await this.execute(userQueries.GET_SEARCH_FOR_STUDENTS, role, {
      query,
      page,
      limit,
    });
  }

  static async addAdmin(role: string, userDetails: object) {
    return await this.execute(userMutations.ADD_ADMIN, role, userDetails);
  }

  static async addTeacher(role: string, userDetails: object) {
    return await this.execute(userMutations.ADD_TEACHER, role, userDetails);
  }

  static async addStudent(role: string, userDetails: object) {
    return await this.execute(userMutations.ADD_STUDENT, role, userDetails);
  }

  static async updateUserDetails(role: string, userDetails: object) {
    return await this.execute(
      userMutations.UPDATE_USER_DETAILS,
      role,
      userDetails,
    );
  }

  static async changePassword(role: string, userDetails: object) {
    return await this.execute(userMutations.CHANGE_PASSWORD, role, userDetails);
  }

  static async removeUser(role: string, id: string) {
    return await this.execute(userMutations.REMOVE_USER, role, {
      id,
    });
  }
}

export default UserAPI;
