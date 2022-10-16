import { Injectable } from '@nestjs/common';
import { News } from './news.interface';

@Injectable()
export class NewsService {
  private readonly news: News[] = [{
    title: 'Новость',
    description: 'овая',
    author: 'Анатолий',
    createdAt: new Date(),
  }];

  create(news: News): number {
    return this.news.push(news);
  }

  update(id: number, news: News): News|null {
    this.news[id].title = news.title;
    this.news[id].description = news.description;

    return this.news[id];
  }

  findAll(): News[] {
    return this.news;
  }

  findByIndex(index: number): News|null {
    console.assert(typeof this.news[index] !== 'undefined', '[findByIndex] Invalid')
    if (typeof this.news[index] !== 'undefined') {
      return this.news[index]
    }
    return null
  }
}
