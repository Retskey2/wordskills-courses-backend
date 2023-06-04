import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/loginAuth.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { RegisterAuthDto } from './dto/registerAuth.dto';
import {  ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('authorization')
@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService: AuthService) {}

    @ApiOperation({ summary: 'Registration for new users' })
    @ApiResponse({ status: 200, description: 'You has been successful registration'})
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('register')
    async register(@Body() dto: RegisterAuthDto) {
        return this.AuthService.register(dto)
    }

    @ApiOperation({ summary: 'Login for users' })
    @UsePipes(new ValidationPipe())
    @ApiResponse({ status: 200, description: 'You has been successful authorization' })
    @HttpCode(200)
    @Post('login')
    async login(@Body() dto: LoginAuthDto) {
        return this.AuthService.login(dto)
    }

    @ApiOperation({ summary: 'Create new access-token users' })
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Create access-token has been successful.' })
    @Post('login/access-token')
    async getNewTokens(@Body() dto: RefreshTokenDto) {
        return this.AuthService.getNewToken(dto)
    }

}
