const mainResolver = {
  Query: {
    _empty: () => ''
  }
};

module.exports = [
  mainResolver,
  ...require('./queries'),
  ...require('./mutations'),
  ...require('./subscriptions')
];
