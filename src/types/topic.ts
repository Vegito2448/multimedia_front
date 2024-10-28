
export interface ITopicPermissions {
  images: boolean;
  videos: boolean;
  texts: boolean;
}

export interface ITopic {
  id: string;
  _id: string;
  name: string;
  permissions: ITopicPermissions;
  deletedAt?: Date;
}

