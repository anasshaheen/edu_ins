const GET_ADMINS = `
  query admins {
    admins {
      id
      name
      email
    }
  }
`;

const GET_TEACHERS = `
  query teachers($page: Int, $limit: Int) {
    teachers(paging: { page: $page, limit: $limit }) {
      totalRecords
      page
      limit
      data {
        id
        name
        email
      }
    }
  }
`;

const GET_STUDENTS = `
  query students($page: Int, $limit: Int) {
    students(paging: { page: $page, limit: $limit }) {
      totalRecords
      page
      limit
      data {
        id
        name
        email
      }
    }
  }
`;

const GET_SEARCH_FOR_STUDENTS = `
  query searchForStudent($page: Int, $limit: Int, $query: String) {
    searchForStudent(paging: { page: $page, limit: $limit }, query: $query) {
      totalRecords
      page
      limit
      data {
        id
        name
        email
      }
    }
  }
`;

export { GET_ADMINS, GET_TEACHERS, GET_STUDENTS, GET_SEARCH_FOR_STUDENTS };
