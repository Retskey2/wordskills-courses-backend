import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Course } from '../entities/Course.entity';
import { UserHasCourse } from '../entities/UserHasCourse.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    TypeOrmModule.forFeature([Course]),
    TypeOrmModule.forFeature([UserHasCourse])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
