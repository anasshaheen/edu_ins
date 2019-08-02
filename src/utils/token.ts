import { verify, decode, sign, Secret } from 'jsonwebtoken';

import { getUser } from '.';
import { jsonWebToken as jwtConfig } from '../config';
import { IAuthState } from '../interfaces';

class TokenUtils {
  static generate(payload: object): string {
    return sign(payload, jwtConfig.privateKey as Secret, jwtConfig.options);
  }

  static decode(token: string): any {
    return decode(token, { complete: true });
  }

  static async validateToken(token: string): Promise<IAuthState> {
    if (!(await this.verifyToken(token))) {
      return { user: undefined, isLoggedIn: false };
    }

    const {
      payload: { email },
    } = this.decode(token);

    return await getUser(email);
  }

  static verifyToken(token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      verify(
        token,
        jwtConfig.privateKey,
        jwtConfig.options,
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
}

export default TokenUtils;
