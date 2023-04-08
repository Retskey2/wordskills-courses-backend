import { Controller, Get, Query } from '@nestjs/common';

import { CourseService } from './course.service';
import { PageDto } from '../page/page.dto';
import { Course } from '../entities/Course.entity';
import { PageOptionsDto } from '../page/page-options.dto';

@Controller('course')
export class CourseController {
    constructor(private courseService: CourseService){}
    
    @Get()
    public async getAll(
        @Query() pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<Course>> {
        return await this.courseService.getAll(pageOptionsDto);
    }

    @Get('/count')
    public async getCount() {
        return await this.courseService.getCount()
    }

}
