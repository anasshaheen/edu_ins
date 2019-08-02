import { IResource, IUser, ISyllable } from '.';

interface ICourse {
  _id: string;
  name: string;
  description: string;
  syllable: ISyllable;
  teachers: [IUser];
  resources: [IResource];
  createdAt: Date;
  updatedAt: Date;
}

export default ICourse;
