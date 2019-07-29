interface IUser {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export default IUser;
