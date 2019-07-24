const main = {
  PaginatedResult: {
    __resolveType: () => 'PaginatedResult'
  }
};

module.exports = [
  main,
  require('./auth.mutation'),
  require('./admin.mutation'),
  require('./user.mutation'),
  require('./teacher.mutation'),
  require('./student.mutation'),
  require('./course.mutation'),
  require('./courseExam.mutation'),
  require('./courseResource.mutation'),
  require('./courseSyllable.mutation'),
  require('./generalResource.mutation'),
  require('./message.mutation'),
  require('./studentExam.mutation')
];
