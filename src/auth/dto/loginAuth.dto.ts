import { ApiProperty } from "@nestjs/swagger"
import { IsString, MinLength } from "class-validator"


export class LoginAuthDto {
    @ApiProperty()
    @IsString()
    @MinLength(6, {
        message: 'input cannot than 6 characters!'
    })
    login: string

    @ApiProperty()
    @IsString()
    @MinLength(6, {
        message: 'Password cannot than 6 characters!'
    })
    passwordHash: string
}