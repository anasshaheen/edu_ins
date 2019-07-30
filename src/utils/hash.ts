import { hash, compare } from 'bcrypt';

class HashUtils {
  static async hashPass(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      hash(password, 10, (err: any, hashedPassword: string) => {
        if (err) {
          return reject(err);
        }

        return resolve(hashedPassword);
      });
    });
  }

  static comparePass(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}

export default HashUtils;
