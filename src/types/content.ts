import { ICategory } from "./category.ts";
import { ITopic } from "./topic.ts";
import { IUser } from "./user.ts";

export interface IContent {
  id: string;
  _id: string;
  title: string;
  category: ICategory;
  topic: ITopic;
  createdBy: IUser;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  url?: string;
  filePublicId?: string;
  description?: string;
}

