import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import { UpdateUserDto } from './dto/user-update.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userModel: Repository<User>){}

    async byId(id: number) {
      const user = await this.userModel.findOne({where: {
        id: id
      }});
      if (!user) throw new NotFoundException('User not found')
      return user
    }
          
    public async getAll(){
      return await this.userModel.find()
    }

    async updateProfile(id: number, dto: UpdateUserDto) {
        const user = await this.byId(id)
        const isSameUser = await this.userModel.findOne({ where: {
            email: dto.email
        } })
    
        if (isSameUser && String(id) !== String(isSameUser.id))
          throw new NotFoundException('Email busy')
    
        if (dto.passwordHash) {
          const salt = await genSalt(10)
          user.passwordHash = await hash(dto.passwordHash, salt)
        }
    
        user.email = dto.email
        if (dto.isAdmin || dto.isAdmin === false)
          user.isAdmin = dto.isAdmin
    

        return await this.userModel.save(user)
      }
    

    async delete(id: number) {
        return this.userModel.delete(id)
      }
}
