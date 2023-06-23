import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../entities/Course.entity';
import { In, MoreThan, Repository } from 'typeorm';
import { PageDto } from '../page/page.dto';
import { PageOptionsDto } from '../page/page-options.dto';
import { PageMetaDto } from '../page/page-meta.dto';
import { UserHasCourse } from '../entities/UserHasCourse.entity';
import { User } from '../entities/User.entity';


@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course) private readonly courseModel: Repository<Course>,
        @InjectRepository(User) private readonly userModel: Repository<User>,
        @InjectRepository(UserHasCourse) private readonly userHasCourseModel: Repository<UserHasCourse>){}

    public async getAll(
        pageOptionsDto: PageOptionsDto,
    ): Promise<PageDto<Course>>{
       const queryBuilder = this.courseModel.createQueryBuilder("courses");

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
        const course = await this.courseModel.findOneBy({ id })
        if (!course) throw new NotFoundException('Course not found')
        return course
    }

    public async getCount() {
        return await this.courseModel.count();
    }

    public async getSubscriptions(id:number){
        const subscriptions  = await this.userHasCourseModel.find({
            where: {
                courseId: id
            }
        })

        const userIds = subscriptions.map((subscription) => subscription.userId);

        const users = await this.userModel.find({
            where: {
              id: In(userIds),
            },
          });

          return users;
       
    }

    public async getMostPopular(): Promise<Course[]> {
        return await this.courseModel.find({
            where: { countOpened: MoreThan(0) },
            order: { countOpened: 'DESC' },
          });
    }

    public async updateCountOpened(id: number): Promise<Course> {
        const course = await this.courseModel.findOneBy({ id });
    
        if (!course) {
          throw new NotFoundException('Course not found');
        }
    
        course.countOpened += 1;
        const updatedCourse = await this.courseModel.save(course);
        return updatedCourse;
      }
}
