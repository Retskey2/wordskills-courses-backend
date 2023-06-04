import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { News } from '../entities/News.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PostsController],
  imports: [TypeOrmModule.forFeature([News])],
  providers: [PostsService]
})
export class PostsModule {}
