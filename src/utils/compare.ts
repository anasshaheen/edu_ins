import { compare } from 'bcrypt';

export default async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};
