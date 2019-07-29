import { IUser } from '.';

interface IGeneralResource {
  id: string;
  title: string;
  description: string;
  url: string;
  user: IUser | string;
  createdAt: Date;
}

export default IGeneralResource;
