import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../entities/Course.entity';
import { User } from '../entities/User.entity';
import { UserHasCourse } from '../entities/UserHasCourse.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([UserHasCourse]),
],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
