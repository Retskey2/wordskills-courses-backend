import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsEmail} from 'class-validator';


export class UserDto implements Readonly<UserDto>{ 
    @ApiProperty({ required: true })
    @IsString()
    login: string;

    @ApiProperty({ required: true })
    @IsString()
    passwordHash: string; 

    @ApiProperty({ required: true })
    @IsEmail()
    email: string; 
}