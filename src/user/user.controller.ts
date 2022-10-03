import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Get()
    public async getAll() {
        return await this.userService.getAll();
    }
}
