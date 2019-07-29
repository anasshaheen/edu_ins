import { sign, Secret } from 'jsonwebtoken';

import { jsonWebToken } from '../config';

export default (payload: any) => {
  return sign(payload, <Secret>jsonWebToken.privateKey, jsonWebToken.options);
};
