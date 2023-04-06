import { Controller, Get } from '@nestjs/common';

import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
    constructor(private courseService: CourseService){}
    
    @Get()
    public async getAll() {
        return await this.courseService.getAll();
    }

}
