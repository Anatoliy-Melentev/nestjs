import { Controller, Get, Param, Post, Put, Body } from '@nestjs/common';

import { News } from "../dto/news.interface";
import { NewsService } from './news.service';
import { htmlTemplate } from '../views/template';
import {newsDetail, newsTemplate} from '../views/news';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('all')
  async getAllNews(): Promise<News[]> {
    return this.newsService.findAll();
  }
  @Get(':id')
  async getNews(@Param('id') id: number): Promise<News|null> {
    return this.newsService.findByIndex(id);
  }
  @Post(':id')
  async updateNews(@Param('id') id: number, @Body() news: News): Promise<News|null> {
    return this.newsService.update(id, news);
  }
  @Put()
  async createNews(@Body() news: News): Promise<number> {
    return this.newsService.create(news);
  }
  @Get()
  async getViewAll(): Promise<string> {
    const news = this.newsService.findAll();
    return htmlTemplate(newsTemplate(news));
  }
  @Get(':id/detail')
  async getView(@Param('id') id: number): Promise<string> {
    const news = this.newsService.findByIndex(id);
    return htmlTemplate(newsDetail(news));
  }
}
