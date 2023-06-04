import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsEmail, IsNumber, IsBoolean} from 'class-validator';


export class UserDto implements Readonly<UserDto>{ 
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty({ required: true })
    @IsString()
    login: string;

    @ApiProperty({ required: true })
    @IsString()
    passwordHash: string; 

    @ApiProperty()
    @IsBoolean()
    isAdmin?: boolean

    @ApiProperty({ required: true })
    @IsEmail()
    email: string; 
}