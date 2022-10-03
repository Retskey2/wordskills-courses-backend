import { IsEmail, IsString, MinLength } from "class-validator"


export class LoginAuthDto {
    @IsString()
    @MinLength(6, {
        message: 'input cannot than 6 characters!'
    })
    login: string

    @IsString()
    @MinLength(6, {
        message: 'Password cannot than 6 characters!'
    })
    passwordHash: string
}