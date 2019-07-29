import { IUser } from '.';

interface IResource {
  id: string;
  title: string;
  description: string;
  url: string;
  user: IUser | string;
}

export default IResource;
