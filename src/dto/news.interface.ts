import { Comment } from "./comments.interface";

export interface News{
  id: number;
  title: string;
  author: string;
  createdAt?: Date;
  updatedAt?: Date;
  description?: string;
  text: string;
  comments?: Comment[];
}
