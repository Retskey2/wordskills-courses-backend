import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MinLength } from "class-validator"


export class LoginAuthDto {
    @ApiProperty()
    @IsString()
    @IsEmail()
    @MinLength(6, {
        message: 'input cannot than 6 characters!'
    })
    email: string

    @ApiProperty()
    @IsString()
    @MinLength(6, {
        message: 'Password cannot than 6 characters!'
    })
    passwordHash: string
}