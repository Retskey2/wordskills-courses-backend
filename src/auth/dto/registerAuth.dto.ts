import { IsEmail, IsString, MinLength } from "class-validator"


export class RegisterAuthDto {
    @IsString()
    @MinLength(6, {
        message: 'Login cannot than 6 characters!'
    })
    login: string

    @IsEmail()
    email: string

    @IsString()
    @MinLength(6, {
        message: 'Password cannot than 6 characters!'
    })
    passwordHash: string
}