import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../entities/Course.entity';
import { Repository } from 'typeorm';
import { PageDto } from '../page/page.dto';
import { PageOptionsDto } from '../page/page-options.dto';
import { PageMetaDto } from '../page/page-meta.dto';


@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course) private readonly _courseRepository: Repository<Course>){}

    public async getAll(
        pageOptionsDto: PageOptionsDto,
    ): Promise<PageDto<Course>>{
       const queryBuilder = this._courseRepository.createQueryBuilder("courses");

       queryBuilder
      .orderBy("courses.createdAt", pageOptionsDto.order)
      .where(pageOptionsDto.searchTerm ? 'courses.name LIKE :searchTerm' : '1=1', { searchTerm: `%${pageOptionsDto.searchTerm}%` })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      
      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();

      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      return new PageDto(entities, pageMetaDto);
    }

    public async getById(id: number): Promise<Course> {
        const course = await this._courseRepository.findOneBy({ id })
        if (!course) throw new NotFoundException('Course not found')
        return course
    }

    public async getCount() {
        return await this._courseRepository.count();
    }
}
