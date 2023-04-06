import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../entities/Course.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course) private readonly courseModel: Repository<Course>){}

    public async getAll(){
        return await this.courseModel.find()
    }
}
