import { Injectable } from '@nestjs/common';
import { News } from '../dto/news.interface';
import {CreateDto} from "./dto/create.dto";

@Injectable()
export class NewsService {
  private readonly news: News[] = [{
    id: 0,
    title: 'Новость',
    description: 'Стаая',
    author: 'Анатолий',
    cover: '/news/a6907c0c-b64c-4699-a52e-0ba27033cc1e.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    text: 'Yjjdfgkdfgkdf',
    comments: [{
      id: 0,
      author: 'Анатолий',
      createdAt: new Date(),
      text: 'Yjjdfgkdfgkdf',
    }, {
      id: 1,
      author: 'Анатолий',
      createdAt: new Date(),
      text: 'Yjjdfgkdfgkdf',
    }],
  }, {
    id: 1,
    title: 'Новость',
    description: 'Новая',
    author: 'Анатолий',
    cover: '/news/7c5d29f4-dc6b-44e6-ad32-9ea5a7ed6b1e.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    text: 'Yjjdfgkdfgkdf',
    comments: [{
      id: 0,
      author: 'Анатолий',
      createdAt: new Date(),
      text: 'Yjjdfgkdfgkdf',
    }, {
      id: 1,
      author: 'Анатолий',
      createdAt: new Date(),
      text: 'Yjjdfgkdfgkdf',
    }],
  }];

  create(news: CreateDto): number {
    return this.news.push({
      ...news,
      id: this.news.length,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  update(id: number, news: News): News|null {
    const newss = this.findAll();
    newss[id] = {
      ...newss[id],
      ...news,
      updatedAt: new Date(),
    };

    return this.news[id];
  }

  findAll(): News[] {
    return this.news;
  }

  findByIndex(index: number): News|null {
    if (typeof this.news[index] !== 'undefined') {
      return this.news[index]
    }
    return null
  }
}
