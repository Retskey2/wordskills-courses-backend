import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsEmail, IsNumber, IsBoolean, IsOptional} from 'class-validator';


export class UpdateUserDto implements Readonly<UpdateUserDto>{ 
    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isAdmin?: boolean

    @ApiProperty()
    @IsString()
    @IsOptional()
    passwordHash?: string; 

    @ApiProperty({ required: true })
    @IsEmail()
    email: string; 
}