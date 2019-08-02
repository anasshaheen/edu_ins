import { User } from '../db';
import { roles } from '../constants';

export default async () => {
  const count = await User.countDocuments({
    role: roles.SUPER_ADMIN,
  });
  if (count) {
    return;
  }

  await User.create({
    phone: '000000000',
    name: 'Admin',
    email: 'admin@gmail.com',
    role: roles.SUPER_ADMIN,
    password: '$2b$10$V1AIkl7GgUGRaY/Ii460jesMgM.Ddhms66pxwqwb4WkHmB//zVJ7a', // password
    avatar: 'http://placehold.it/200/200',
  });
};
