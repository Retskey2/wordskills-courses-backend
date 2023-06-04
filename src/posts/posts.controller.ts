import { Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { News } from '../entities/News.entity';
import { Auth } from '../auth/decorators/auth.decorator';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService){}

    @ApiOperation({ summary: 'Get all posts' })
    @ApiResponse({ status: 200, description: 'The list of posts has been successfully retrieved.' })
    @HttpCode(200)
    @Get()
    public async getAll(): Promise<News[]> {
        return await this.postsService.getAll();
    }
    
    @ApiOperation({ summary: 'Create new post' })
    @ApiResponse({ status: 201, description: 'The post has been successfully created'})
    @ApiBearerAuth()
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post()
    async create() {
      return this.postsService.create()
    }
  
    @ApiOperation({ summary: 'Get count of posts' })
    @ApiResponse({ status: 200, description: 'The count of posts has been successfully retrieved.' })
    @HttpCode(200)
    @Get('/count')
    public async getCount() {
        return await this.postsService.getCount()
    }

    @ApiOperation({ summary: 'Get a post by ID' })
    @ApiResponse({ status: 200, description: 'The post by id has been successfully retrieved.' })
    @HttpCode(200)
    @Get(':id')
    public async getById(@Param('id') id: number) {
        return await this.postsService.getById(id)
    }
}
