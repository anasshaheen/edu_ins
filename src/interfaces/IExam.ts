import { IUser, ICourse } from '.';

interface IExam {
  id: string;
  name: string;
  description: string;
  grade: number;
  author: IUser | string;
  course: ICourse | string;
  createdAt: Date;
}

export default IExam;
