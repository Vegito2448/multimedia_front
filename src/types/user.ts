
export interface IUser {
  id?: string;
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'creator' | 'reader';
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}