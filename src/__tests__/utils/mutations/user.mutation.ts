const LOGIN = `
  mutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token {
        access_token,
        expires_in
      }
      user {
        id
        name
      }
    }
  }
`;

const ADD_ADMIN = `
  mutation($email: String!, $name: String!, $phone: String!, $password: String!) {
    addAdmin(input: {
      email: $email,
      name: $name,
      phone: $phone,
      password: $password
    }){
      message
      code
    }
  }
`;

const ADD_TEACHER = `
  mutation($email: String!, $name: String!, $phone: String!, $password: String!) {
    addTeacher(input: {
      email: $email,
      name: $name,
      phone: $phone,
      password: $password
    }){
      message
      code
    }
  }
`;

const ADD_STUDENT = `
  mutation($email: String!, $name: String!, $phone: String!, $password: String!) {
    addStudent(input: {
      email: $email,
      name: $name,
      phone: $phone,
      password: $password
    }){
      message
      code
    }
  }
`;

const UPDATE_USER_DETAILS = `
  mutation ($email: String, $name: String, $phone: String) {
    updateUser(input: {email: $email, name: $name, phone: $phone}) {
      message,
      code
    }
  }
`;

const CHANGE_PASSWORD = `
  mutation ($oldPassword: String!, $newPassword: String!) {
    changePassword(input:{ oldPassword: $oldPassword, newPassword: $newPassword }) {
      message,
      code
    }
  }
`;

const REMOVE_USER = `
  mutation ($id: String!) {
    removeUser(id: $id) {
      message,
      code
    }
  }
`;

export {
  LOGIN,
  ADD_ADMIN,
  ADD_STUDENT,
  ADD_TEACHER,
  UPDATE_USER_DETAILS,
  CHANGE_PASSWORD,
  REMOVE_USER,
};
