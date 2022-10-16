import { Controller, Get, Param, Post, Put, Body, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from "./news.interface";

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
}
