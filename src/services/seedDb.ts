import { roles } from '../constants';

const { User } = require('../db');

const { hash } = require('../utils');

export default async () => {
  try {
    const count = await User.collection.countDocuments({
      role: roles.ADMIN,
    });
    if (count) {
      return;
    }

    const admin = new User({
      phone: '000000000',
      name: 'Admin',
      email: 'admin@gmail.com',
      password: await hash('password'),
      role: roles.ADMIN,
      avatar: 'http://placehold.it/200/200',
    });
    await admin.save();
  } catch (err) {
    console.log(err);
  }
};
