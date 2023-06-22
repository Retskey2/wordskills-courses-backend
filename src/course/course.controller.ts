import { Body, Controller, Get, HttpCode, Param, Put, Query } from '@nestjs/common';

import { CourseService } from './course.service';
import { PageDto } from '../page/page.dto';
import { Course } from '../entities/Course.entity';
import { PageOptionsDto } from '../page/page-options.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('courses')
@Controller('course')
export class CourseController {
    constructor(private courseService: CourseService){}
    
    @ApiOperation({ summary: 'Get all courses' })
    @ApiResponse({ status: 200, description: 'The list of courses has been successfully retrieved.' })
    @HttpCode(200)
    @Get()
    public async getAll(
        @Query() pageOptionsDto: PageOptionsDto,
    ): Promise<PageDto<Course>> {
        return await this.courseService.getAll(pageOptionsDto);
    }

    @Get('most-popular')
    @HttpCode(200)
    async getMostPopular() {
        return this.courseService.getMostPopular()
    }

    @ApiOperation({ summary: 'Get count of courses' })
    @ApiResponse({ status: 200, description: 'The count of courses has been successfully retrieved.' })
    @HttpCode(200)
    @Get('/count')
    public async getCount() {
        return await this.courseService.getCount()
    }

    @ApiOperation({ summary: 'Get a course by ID' })
    @ApiResponse({ status: 200, description: 'The course by id has been successfully retrieved.' })
    @HttpCode(200)
    @Get(':id')
    public async getById(@Param('id') id: number) {
        return await this.courseService.getById(id)
    }

    @ApiOperation({ summary: 'Get a course subscriptions by ID' })
    @ApiResponse({ status: 200, description: 'The course subscriptions by id has been successfully retrieved.' })
    @HttpCode(200)
    @Get('/subscriptions/:id')
    public async getSubscriptions(@Param('id') id: number) {
        return await this.courseService.getSubscriptions(id)
    }


    @Put('update-count-opened/:id')
    @HttpCode(200)
    async updateCountOpened(@Param('id') id: number) {
        return this.courseService.updateCountOpened(id)
    }
}
