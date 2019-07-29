import { IResource, IExam, IUser, ISyllable } from '.';

interface ICourse {
  id: string;
  name: string;
  description: string;
  syllable: ISyllable;
  teachers: [IUser];
  exams: [IExam];
  resources: [IResource];
  createdAt: Date;
  updatedAt: Date;
}

export default ICourse;
