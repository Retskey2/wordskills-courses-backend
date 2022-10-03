import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/loginAuth.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { RegisterAuthDto } from './dto/registerAuth.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('register')
    async register(@Body() dto: RegisterAuthDto) {
        return this.AuthService.register(dto)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login')
    async login(@Body() dto: LoginAuthDto) {
        return this.AuthService.login(dto)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login/access-token')
    async getNewTokens(@Body() dto: RefreshTokenDto) {
        return this.AuthService.getNewToken(dto)
    }

}
