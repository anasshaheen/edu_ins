import { UserAPI } from '../utils/api';

beforeAll(async () => {
  await UserAPI.initTokens();
});

let userToBeRmoved1 = '';
let userToBeRmoved2 = '';

describe('Mutation: Authentication', () => {
  test('LOGIN_ValidData_ShouldSucceed', async done => {
    const res = await UserAPI.authenticate('user1@gmail.com', 'password');

    expect(res.status).toEqual(200);
    expect(res.data).toBeDefined();
    const data = res.data.data;

    expect(data).toBeDefined();
    expect(data.login).toBeDefined();
    expect(data.login).toHaveProperty('token');
    expect(data.login).toHaveProperty('user');
    expect(data.login.token).toHaveProperty('access_token');
    expect(data.login.token.access_token).toBeTruthy();
    expect(data.login.token).toHaveProperty('expires_in');

    done();
  });

  test('LOGIN_InValidData_UserNotFound_ShouldFail', async done => {
    const res = await UserAPI.authenticate('user15@gmail.com', 'password');

    expect(res.status).toEqual(200);
    expect(res.data).toBeDefined();

    const data = res.data;

    expect(data).toBeDefined();
    expect(data.errors).toBeDefined();
    expect(data.errors.length).toEqual(1);
    expect(data.errors[0].message).toEqual('Email or password are wrong!');

    done();
  });

  test('LOGIN_InValidData_WrongPassword_ShouldFail', async done => {
    const res = await UserAPI.authenticate('user1@gmail.com', 'password123');

    expect(res.status).toEqual(200);
    expect(res.data).toBeDefined();

    const data = res.data;

    expect(data).toBeDefined();
    expect(data.errors).toBeDefined();
    expect(data.errors.length).toEqual(1);

    done();
  });
});

describe('Query: Query users with different roles', () => {
  test('GET_ADMINS_HaveAcess_ShouldSucceed', async done => {
    const res = await UserAPI.getAdmins('admin');

    expect(res.status).toEqual(200);
    expect(res.data).toBeDefined();

    const data = res.data.data;
    expect(data).toBeDefined();
    expect(data.admins).toBeDefined();
    expect(data.admins.length).toBeTruthy();
    expect(data.admins.length).toEqual(1);

    done();
  });

  test('GET_ADMINS_TeachersHaveNoAcess_ShouldFail', async done => {
    const res = await UserAPI.getAdmins('teacher');

    expect(res.status).toEqual(200);

    const data = res.data;
    expect(data).toBeDefined();
    expect(data.errors).toBeDefined();
    expect(data.errors.length).toEqual(1);
    expect(data.errors[0].message).toEqual('User is not authorized');

    done();
  });

  test('GET_ADMINS_StudentsHaveNoAcess_ShouldFail', async done => {
    const res = await UserAPI.getAdmins('student');

    expect(res.status).toEqual(200);

    const data = res.data;
    expect(data).toBeDefined();
    expect(data.errors).toBeDefined();
    expect(data.errors.length).toEqual(1);
    expect(data.errors[0].message).toEqual('User is not authorized');

    done();
  });

  test('GET_TEACHERS_HaveAcess_ShouldSucceed', async done => {
    const res = await UserAPI.getTeachers('admin', 1, 1);

    expect(res.status).toEqual(200);
    expect(res.data).toBeDefined();

    const data = res.data.data;

    expect(data).toBeDefined();
    expect(data.teachers).toBeDefined();
    expect(data.teachers).toHaveProperty('page');
    expect(data.teachers).toHaveProperty('limit');
    expect(data.teachers).toHaveProperty('totalRecords');
    expect(data.teachers.totalRecords).toEqual(1);
    expect(data.teachers).toHaveProperty('data');
    expect(data.teachers.data.length).toBeTruthy();
    expect(data.teachers.data.length).toEqual(1);

    userToBeRmoved1 = data.teachers.data[0].id;

    done();
  });

  test('GET_TEACHERS_HaveNoAcess_ShouldFail', async done => {
    const res1 = await UserAPI.getTeachers('teacher', 1, 1);
    const res2 = await UserAPI.getTeachers('student', 1, 1);

    expect(res1.status).toEqual(200);
    expect(res2.status).toEqual(200);

    const data1 = res1.data;
    expect(data1).toBeDefined();
    expect(data1.errors).toBeDefined();
    expect(data1.errors.length).toEqual(1);
    expect(data1.errors[0].message).toEqual('User is not authorized');

    const data2 = res2.data;
    expect(data2).toBeDefined();
    expect(data2.errors).toBeDefined();
    expect(data2.errors.length).toEqual(1);
    expect(data2.errors[0].message).toEqual('User is not authorized');

    done();
  });

  test('GET_STUDENTS_HaveAcess_ShouldSucceed', async done => {
    const res = await UserAPI.getStudents('teacher', 1, 1);

    expect(res.status).toEqual(200);
    expect(res.data).toBeDefined();

    const data = res.data.data;

    expect(data).toBeDefined();
    expect(data.students).toBeDefined();
    expect(data.students).toHaveProperty('page');
    expect(data.students).toHaveProperty('limit');
    expect(data.students).toHaveProperty('totalRecords');
    expect(data.students.totalRecords).toEqual(1);
    expect(data.students).toHaveProperty('data');
    expect(data.students.data.length).toBeTruthy();
    expect(data.students.data.length).toEqual(1);

    userToBeRmoved2 = data.students.data[0].id;

    done();
  });

  test('GET_STUDENTS_HaveNoAcess_ShouldFail', async done => {
    const res = await UserAPI.getStudents('student', 1, 1);

    expect(res.status).toEqual(200);

    const data = res.data;
    expect(data).toBeDefined();

    expect(data.errors).toBeDefined();
    expect(data.errors.length).toEqual(1);
    expect(data.errors[0].message).toEqual('User is not authorized');

    done();
  });

  test('GET_SEARCH_FOR_STUDENTS_HaveAcess_ShouldSucceed', async done => {
    const res = await UserAPI.searchForStudents('teacher', 'user', 1, 1);

    expect(res.status).toEqual(200);
    expect(res.data).toBeDefined();

    const data = res.data.data;
    expect(data).toBeDefined();
    expect(data.searchForStudent).toBeDefined();
    expect(data.searchForStudent).toHaveProperty('page');
    expect(data.searchForStudent).toHaveProperty('limit');
    expect(data.searchForStudent).toHaveProperty('totalRecords');
    expect(data.searchForStudent.totalRecords).toEqual(1);
    expect(data.searchForStudent).toHaveProperty('data');
    expect(data.searchForStudent.data.length).toBeTruthy();
    expect(data.searchForStudent.data.length).toEqual(1);

    done();
  });

  test('GET_SEARCH_FOR_STUDENTS_HaveNoAcess_ShouldFail', async done => {
    const res = await UserAPI.searchForStudents('student', 'user', 1, 1);

    expect(res.status).toEqual(200);

    const data = res.data;
    expect(data).toBeDefined();

    expect(data.errors).toBeDefined();
    expect(data.errors.length).toEqual(1);
    expect(data.errors[0].message).toEqual('User is not authorized');

    done();
  });
});

describe('Mutation: Add users with different roles', () => {
  test('ADD_ADMIN_ValidData_HaveAcess_ShouldSucceed', async done => {
    const res = await UserAPI.addAdmin('admin', {
      email: 'newAdmin@admin.com',
      name: 'new admin',
      phone: '002233445566',
      password: 'password',
    });

    expect(res.status).toEqual(200);
    expect(res.data).toBeDefined();

    const data = res.data.data;

    expect(data).toBeDefined();
    expect(data.addAdmin).toBeDefined();
    expect(data.addAdmin).toHaveProperty('code');
    expect(data.addAdmin.code).toEqual(201);
    expect(data.addAdmin).toHaveProperty('message');
    expect(data.addAdmin.message).toEqual('Admin created successfully.');

    done();
  });

  test('ADD_ADMIN_InValidData_HaveAcess_ShouldSucceed', async done => {
    try {
      await UserAPI.addAdmin('admin', {
        email: 'newAdmin@admin.com',
        name: 'new admin',
        phone: '002233445566',
        password: undefined,
      });
    } catch (err) {
      const res = err.response;
      expect(res.status).toEqual(400);

      const data = res.data;
      expect(data).toBeDefined();
      expect(data.errors).toBeDefined();

      done();
    }
  });

  test('ADD_ADMIN_ValidData_HaveNoAcess_ShouldSucceed', async done => {
    const res = await UserAPI.addAdmin('teacher', {
      email: 'newAdmin2@admin.com',
      name: 'new admin',
      phone: '00223344556',
      password: 'password',
    });

    expect(res.status).toEqual(200);

    const data = res.data;
    expect(data).toBeDefined();

    expect(data.errors).toBeDefined();
    expect(data.errors.length).toEqual(1);
    expect(data.errors[0].message).toEqual('User is not authorized');

    done();
  });

  test('ADD_ADMIN_InValidData_HaveNoAcess_ShouldSucceed', async done => {
    try {
      await UserAPI.addAdmin('teacher', {
        email: 'newAdmin@admin.com',
        name: 'new admin',
        phone: '002233445566',
        password: undefined,
      });
    } catch (err) {
      const res = err.response;
      expect(res.status).toEqual(400);

      const data = res.data;
      expect(data).toBeDefined();
      expect(data.errors).toBeDefined();

      done();
    }
  });

  test('ADD_TEACHER_ValidData_HaveAcess_ShouldSucceed', async done => {
    const res = await UserAPI.addTeacher('admin', {
      email: 'newTeacher@teacher.com',
      name: 'new teacher',
      phone: '00223366',
      password: 'password',
    });

    expect(res.status).toEqual(200);
    expect(res.data).toBeDefined();

    const data = res.data.data;

    expect(data).toBeDefined();
    expect(data.addTeacher).toBeDefined();
    expect(data.addTeacher).toHaveProperty('code');
    expect(data.addTeacher.code).toEqual(201);
    expect(data.addTeacher).toHaveProperty('message');
    expect(data.addTeacher.message).toEqual('Teacher created successfully.');

    done();
  });

  test('ADD_TEACHER_InValidData_HaveAcess_ShouldSucceed', async done => {
    try {
      await UserAPI.addTeacher('admin', {
        email: 'newTeacher@teacher.com',
        name: 'new teacher',
        phone: '002223366',
        password: undefined,
      });
    } catch (err) {
      const res = err.response;
      expect(res.status).toEqual(400);

      const data = res.data;
      expect(data).toBeDefined();
      expect(data.errors).toBeDefined();

      done();
    }
  });

  test('ADD_TEACHER_ValidData_HaveNoAcess_ShouldSucceed', async done => {
    const res = await UserAPI.addTeacher('student', {
      email: 'newTeacher@teacher.com',
      name: 'new teacher',
      phone: '00223366',
      password: 'password',
    });

    expect(res.status).toEqual(200);

    const data = res.data;
    expect(data).toBeDefined();

    expect(data.errors).toBeDefined();
    expect(data.errors.length).toEqual(1);
    expect(data.errors[0].message).toEqual('User is not authorized');

    done();
  });

  test('ADD_TEACHER_InValidData_HaveNoAcess_ShouldSucceed', async done => {
    try {
      await UserAPI.addTeacher('student', {
        email: 'newTeacher2@teacher.com',
        name: 'new teacher',
        phone: '00223362226',
        password: undefined,
      });
    } catch (err) {
      const res = err.response;
      expect(res.status).toEqual(400);

      const data = res.data;
      expect(data).toBeDefined();
      expect(data.errors).toBeDefined();

      done();
    }
  });

  test('ADD_STUDENT_ValidData_HaveAcess_ShouldSucceed', async done => {
    const res = await UserAPI.addStudent('admin', {
      email: 'newStudent@student.com',
      name: 'new student',
      phone: '00223366123123',
      password: 'password',
    });

    expect(res.status).toEqual(200);
    expect(res.data).toBeDefined();

    const data = res.data.data;

    expect(data).toBeDefined();
    expect(data.addStudent).toBeDefined();
    expect(data.addStudent).toHaveProperty('code');
    expect(data.addStudent.code).toEqual(201);
    expect(data.addStudent).toHaveProperty('message');
    expect(data.addStudent.message).toEqual('Student created successfully.');

    done();
  });

  test('ADD_STUDENT_InValidData_HaveAcess_ShouldSucceed', async done => {
    try {
      await UserAPI.addStudent('admin', {
        email: 'newStudent@student.com',
        name: 'new student',
        phone: '00223366123123',
        password: undefined,
      });
    } catch (err) {
      const res = err.response;
      expect(res.status).toEqual(400);

      const data = res.data;
      expect(data).toBeDefined();
      expect(data.errors).toBeDefined();

      done();
    }
  });

  test('ADD_STUDENT_ValidData_HaveNoAcess_ShouldSucceed', async done => {
    const res = await UserAPI.addStudent('student', {
      email: 'newStudent@student.com',
      name: 'new student',
      phone: '00223366123123',
      password: 'password',
    });

    expect(res.status).toEqual(200);

    const data = res.data;
    expect(data).toBeDefined();

    expect(data.errors).toBeDefined();
    expect(data.errors.length).toEqual(1);
    expect(data.errors[0].message).toEqual('User is not authorized');

    done();
  });

  test('ADD_STUDENT_InValidData_HaveNoAcess_ShouldSucceed', async done => {
    try {
      await UserAPI.addStudent('student', {
        email: 'newStudent@student.com',
        name: 'new student',
        phone: '00223366123123',
        password: undefined,
      });
    } catch (err) {
      const res = err.response;
      expect(res.status).toEqual(400);

      const data = res.data;
      expect(data).toBeDefined();
      expect(data.errors).toBeDefined();

      done();
    }
  });
});

describe('Mutation: Manage users accounts', () => {
  test('UPDATE_USER_DETAILS_ValidData_ShouldSucceed', async done => {
    const res = await UserAPI.updateUserDetails('student', {
      email: 'newStudentEmail@gmail.com',
      name: 'new student name',
      phone: '9988776655',
    });

    expect(res.status).toEqual(200);
    expect(res.data).toBeDefined();

    const data = res.data.data;

    expect(data).toBeDefined();
    expect(data.updateUser).toBeDefined();
    expect(data.updateUser).toHaveProperty('code');
    expect(data.updateUser.code).toEqual(200);
    expect(data.updateUser).toHaveProperty('message');
    expect(data.updateUser.message).toEqual('User updated successfully.');

    done();
  });

  test('CHANGE_PASSWORD_ValidData_ShouldSucceed', async done => {
    const res = await UserAPI.changePassword('teacher', {
      oldPassword: 'password',
      newPassword: 'newPassword',
    });

    expect(res.status).toEqual(200);
    expect(res.data).toBeDefined();

    const data = res.data.data;
    expect(data).toBeDefined();
    expect(data.changePassword).toBeDefined();
    expect(data.changePassword).toHaveProperty('code');
    expect(data.changePassword.code).toEqual(200);
    expect(data.changePassword).toHaveProperty('message');
    expect(data.changePassword.message).toEqual(
      'Password updated successfully.',
    );

    done();
  });

  test('CHANGE_PASSWORD_InValidData_ShouldSucceed', async done => {
    const res = await UserAPI.changePassword('teacher', {
      oldPassword: 'wrong password',
      newPassword: 'newPassword',
    });

    expect(res.status).toEqual(200);
    expect(res.data).toBeDefined();

    const data = res.data;
    expect(data).toBeDefined();

    expect(data.errors).toBeDefined();
    expect(data.errors.length).toEqual(1);
    expect(data.errors[0].message).toEqual('Password does not match.');
    done();
  });

  test('REMOVE_USER_ValidID_HaveAccess_ShouldSucceed', async done => {
    const res = await UserAPI.removeUser('admin', userToBeRmoved2);

    expect(res.status).toEqual(200);
    expect(res.data).toBeDefined();

    const data = res.data.data;
    expect(data).toBeDefined();
    expect(data.removeUser).toBeDefined();
    expect(data.removeUser).toHaveProperty('code');
    expect(data.removeUser.code).toEqual(200);
    expect(data.removeUser).toHaveProperty('message');
    expect(data.removeUser.message).toEqual('User removed successfully.');

    done();
  });

  test('REMOVE_USER_InValidID_HaveAccess_ShouldSucceed', async done => {
    const res = await UserAPI.removeUser('teacher', userToBeRmoved1);

    expect(res.status).toEqual(200);
    expect(res.data).toBeDefined();

    const data = res.data;
    expect(data).toBeDefined();

    expect(data.errors).toBeDefined();
    expect(data.errors.length).toEqual(1);

    done();
  });
});
