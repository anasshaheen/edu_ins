const { PubSub } = require('apollo-server-express');

const pubSub = new PubSub();

module.exports = {
  publish(eventName, payload) {
    return pubSub.publish(eventName, payload);
  },
  itrator(eventName) {
    return pubSub.asyncIterator([eventName]);
  }
};
