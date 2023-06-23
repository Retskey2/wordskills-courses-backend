import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from '../entities/News.entity';
import { MoreThan, Repository } from 'typeorm';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  
    constructor(
        @InjectRepository(News) private readonly _postsRepository: Repository<News>){}

        public async getAll(){
            return await this._postsRepository.find()
        }

        public async getMostPopular(): Promise<News[]> {
          return await this._postsRepository.find({
              where: { countOpened: MoreThan(0) },
              order: { countOpened: 'DESC' },
            });
      }

        public async create() {
            const defaultValue: UpdatePostDto = {
                title: '',
                body: '',
                category: [],
                imgSrc: '',
                intro: '',
              }    
              
            const post = await this._postsRepository.create(defaultValue)
            return post.id
          }


          public async getCount() {
            return await this._postsRepository.count();
        }

        public async getById(id: number): Promise<News> {
          const course = await this._postsRepository.findOneBy({ id })
          if (!course) throw new NotFoundException('Post not found')
          return course
      }

      public async updateCountOpened(id: number): Promise<News> {
        const news = await this._postsRepository.findOneBy({ id });
    
        if (!news) {
          throw new NotFoundException('Course not found');
        }
    
        news.countOpened += 1;
        const updatedNews = await this._postsRepository.save(news);
        return updatedNews;
      }

      
    
}
