import { IUser, IExam } from '.';

interface IExamMark {
  id: string;
  exam: IExam | string;
  student: IUser | string;
  grade: number;
  createdAt: Date;
}

export default IExamMark;
