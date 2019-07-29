import { verify } from 'jsonwebtoken';

import { jsonWebToken } from '../config';

function verifyToken(token: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    verify(
      token,
      jsonWebToken.privateKey,
      jsonWebToken.options,
      (err: Error): void => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      },
    );
  });
}

export default verifyToken;
