import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { DecrementId } from "../utils/decrement-id.decorator";
import { News } from "../dto/news.interface";
import { Comment } from "../dto/comments.interface";

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/')
  async getComments(@Query() @DecrementId(['id']) query: { id: number }): Promise<Comment[]> {
    return this.commentsService.getComments(query.id);
  }

  @Get('/')
  async getComment(@Query() @DecrementId(['newsId', 'id']) query: { newsId: number, id: number }): Promise<any |Comment | undefined> {
    return this.commentsService.getComment(query.newsId, query.id);
  }

  @Post('/')
  async updateComment(@Query() @DecrementId(['newsId', 'id']) query: { newsId: number, id: number }, @Body() data: Comment): Promise<Comment> {
    return this.commentsService.updateComment(query.newsId, query.id, data);
  }

  @Put('/')
  async createComment(@Query() @DecrementId(['id']) query: { id: number }, @Body() data: Comment): Promise<Comment> {
    return this.commentsService.createComment(query.id, data);
  }

  @Delete('/')
  async deleteComment(@Body() body: { postId: number, commentId: number }): Promise<News[]> {
    return this.commentsService.deleteComment(body.postId, body.commentId);
  }
}
