import { Body, Controller, Delete, Get, Post, Put, Query, Render, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { DecrementId } from "../utils/decrement-id.decorator";
import { News } from "../dto/news.interface";
import { Comment } from "../dto/comments.interface";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from "../utils/HelperFileLoader";


const helperFileLoader = new HelperFileLoader();
helperFileLoader.path = '/comments';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/all')
  async getComments(@Query() @DecrementId(['id']) query: { id: number }): Promise<Comment[]> {
    return this.commentsService.getComments(query.id);
  }

  @Get('add')
  @Render('comments-add')
  async getUpload(): Promise<string> {
    return '';
  }

  @Get('/')
  async getComment(
    @Query() @DecrementId(['newsId', 'id']) query: { newsId: number, id: number }
  ): Promise<any |Comment | undefined> {
    return this.commentsService.getComment(query.newsId, query.id);
  }

  @Put('/')
  @UseInterceptors(FileInterceptor('file',  {
    storage: diskStorage({
      destination: helperFileLoader.destinationPath,
      filename: helperFileLoader.customFileName,
    }),
  }))
  async createComment(
    @Query() @DecrementId(['id']) query: { id: number },
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateCommentDto,
  ): Promise<Comment> {
    return await this.commentsService.createComment(query.id, {
      ...data, avatar: 'comments/' + file.filename,
    });
  }

  @Post('/update')
  @UseInterceptors(FileInterceptor('file',  {
    storage: diskStorage({
      destination: helperFileLoader.destinationPath,
      filename: helperFileLoader.customFileName,
    }),
  }))
  async updateComment(
    @Query() @DecrementId(['newsId', 'id']) query: { newsId: number, id: number },
    @UploadedFile() file: Express.Multer.File,
    @Body() data: UpdateCommentDto
  ): Promise<Comment> {
    return this.commentsService.updateComment(query.newsId, query.id, {
      ...data, avatar: file ? 'comments/' + file.filename : '',
    });
  }
  @Delete('/')
  async deleteComment(@Body() body: { postId: number, commentId: number }): Promise<News[]> {
    return this.commentsService.deleteComment(body.postId, body.commentId);
  }
}
