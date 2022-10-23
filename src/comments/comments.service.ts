import { Injectable } from '@nestjs/common';
import { Comment } from '../dto/comments.interface';
import { News } from '../dto/news.interface';
import { NewsService } from '../news/news.service';
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

import * as fs from 'fs';

@Injectable()
export class CommentsService {
  constructor(private readonly newsService: NewsService) {}

  async getComments(newsId: number): Promise<Comment[]> {
    const news = await this.newsService.findAll();
    return news[newsId].comments;
  }

  async getComment(newsId: number, id: number): Promise<Comment> {
    const news = await this.newsService.findAll();
    return news[newsId].comments[id];
  }

  async updateComment(newsId: number, id: number, data: UpdateCommentDto): Promise<Comment> {
    const news = await this.newsService.findAll();
    news[newsId].comments[id] = {
      ...news[newsId].comments[id],
      ...data,
      updatedAt: new Date(),
    };

    return news[newsId].comments[id];
  }

  async createComment(postId: number, data: CreateCommentDto): Promise<Comment> {
    const news = await this.newsService.findAll();
    news[postId].comments.push({
      ...data,
      id: news[postId].comments.length,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return news[postId].comments[news[postId].comments.length];
  }

  async deleteComment(postId: number, commentId: number): Promise<News[]> {
    const news = await this.newsService.findAll();
    const post = news[postId];
    const comment = post.comments[commentId]
    if (comment) {
      post.comments.splice(commentId, commentId);
      return news;
    } else throw new Error('Comment not found');
  }
}
