import { Body, Controller, Delete, Get, HttpCode, Param, Put} from '@nestjs/common';

import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/user-update.dto';


@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private userService: UserService){}
    
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'The list of users has been successfully retrieved'})
    @Auth('admin')
    @ApiBearerAuth()
    @Get()
    public async getAll() {
        return await this.userService.getAll();
    }
  
    @ApiOperation({ summary: 'Get current auth user' })
    @ApiResponse({ status: 200, description: 'The current has been successfully retrieved'})
    @HttpCode(200)
    @ApiBearerAuth()
    @Auth()
    @Get('profile')
    async getProfile(
      @User('id') id: number
      ) {
      return this.userService.byId(id)
    }

    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({ status: 200, description: 'The current has been successfully retrieved'})
    @ApiBearerAuth()
    @HttpCode(200)
    @Auth('admin')
    @Get('/:id')
    async getUser(@Param('id') id: number) {
      return this.userService.byId(id)
    }

    @ApiOperation({ summary: 'Put current auth user' })
    @ApiResponse({ status: 200, description: 'The current has been successfully edited'})
    @HttpCode(200)
    @ApiBearerAuth()
    @Auth()
    @Put('profile')
    async updateProfile(
      @User('id') id: number,
      @Body() dto: UpdateUserDto,
    ) {
      return this.userService.updateProfile(id, dto)
    }

    @ApiOperation({ summary: 'Delete current auth user' })
    @ApiResponse({ status: 200, description: 'The current has been successfully deleted'})
    @HttpCode(200)
    @ApiBearerAuth()
    @Auth('admin')
    @Delete(':id')
    async deleteUser(
      @Param('id') id: number,
    ) {
      return this.userService.delete(id)
    }
}
