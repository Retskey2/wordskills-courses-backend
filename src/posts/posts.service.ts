import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from '../entities/News.entity';
import { Repository } from 'typeorm';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(News) private readonly _postsRepository: Repository<News>){}

        public async getAll(){
            return await this._postsRepository.find()
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
    
}
