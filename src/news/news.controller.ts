import { Controller, Get, Param, Post, Put, Body,UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from '../utils/HelperFileLoader';

import { News } from "../dto/news.interface";
import { NewsService } from './news.service';
import { htmlTemplate } from '../views/template';
import { newsDetail, newsTemplate, uploadForm } from '../views/news';
import { FindByIndexDto } from "./dto/find-by-index.dto";
import { CreateDto } from "./dto/create.dto";

const helperFileLoader = new HelperFileLoader();
helperFileLoader.path = '/news';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('all')
  async getAllNews(): Promise<News[]> {
    return this.newsService.findAll();
  }
  @Get('upload')
  async getUpload(): Promise<string> {
    return htmlTemplate(uploadForm());
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
  async createNews(@Body() news: CreateDto): Promise<number> {
    return this.newsService.create(news);
  }
  @Get()
  async getViewAll(): Promise<string> {
    const news = this.newsService.findAll();
    return htmlTemplate(newsTemplate(news));
  }
  @Get(':id/detail')
  async getView(@Param('id') id: FindByIndexDto): Promise<string> {
    const news = this.newsService.findByIndex(+id);
    return htmlTemplate(newsDetail(news));
  }
}
