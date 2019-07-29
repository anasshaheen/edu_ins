import { hash } from 'bcrypt';

export default async (password: string) => {
  return await hash(password, 10);
};
