import { PubSub } from 'apollo-server-express';

const pubSub = new PubSub();

function publish(eventName: string, payload: any) {
  return pubSub.publish(eventName, payload);
}

function itrator(eventName: string) {
  return pubSub.asyncIterator([eventName]);
}

export default {
  publish,
  itrator,
};
