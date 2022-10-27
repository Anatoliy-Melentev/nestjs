import {Controller, Get, Param, Post, Put, Body, UploadedFile, UseInterceptors, Res, Render} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from '../utils/HelperFileLoader';

import { News } from "../dto/news.interface";
import { NewsService } from './news.service';
import { FindByIndexDto } from "./dto/find-by-index.dto";
import { CreateDto } from "./dto/create.dto";
import { Express } from "express";

const helperFileLoader = new HelperFileLoader();
helperFileLoader.path = '/news';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('all')
  async getAllNews(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Get(':id/detail')
  @Render('news-detail')
  async getView(@Param('id') id: FindByIndexDto): Promise<{ news: News }> {
    const news = this.newsService.findByIndex(+id);
    return { news: news };
  }
  @Get(':id')
  async getNews(@Param('id') id: FindByIndexDto): Promise<News|null> {
    return this.newsService.findByIndex(+id);
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file',  {
    storage: diskStorage({
      destination: helperFileLoader.destinationPath,
      filename: helperFileLoader.customFileName,
    }),
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
  @Post(':id')
  async updateNews(@Param('id') id: number, @Body() news: News): Promise<News|null> {
    return this.newsService.update(id, news);
  }
  @Post('create')
  @UseInterceptors(FileInterceptor('file',  {
    storage: diskStorage({
      destination: helperFileLoader.destinationPath,
      filename: helperFileLoader.customFileName,
    }),
  }))
  async createNews(
    @UploadedFile() file: Express.Multer.File,
    @Body() news: CreateDto
  ): Promise<number> {
    return this.newsService.create({
      ...news, cover: 'news/' + file.filename
    });
  }

  @Get()
  @Render('news-list')
  async getViewAll(): Promise<{ news: News[] }> {
    const news = this.newsService.findAll();
    return { news: news };
  }

}
