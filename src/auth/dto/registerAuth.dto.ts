import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MinLength } from "class-validator"


export class RegisterAuthDto {
    @ApiProperty()
    @IsString()
    @MinLength(6, {
        message: 'Login cannot than 6 characters!'
    })
    login: string

    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    @MinLength(6, {
        message: 'Password cannot than 6 characters!'
    })
    passwordHash: string
}