import { Comment } from './comments.dto';

export class News {
  id!: number;
  title!: string;
  author!: string;
  createdAt!: Date;
  updatedAt!: Date;
  description!: string;
  text!: string;
  comments!: Comment[];
}