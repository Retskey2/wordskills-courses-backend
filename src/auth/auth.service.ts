import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../entities/User.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';
import { RegisterAuthDto } from './dto/registerAuth.dto';
import { LoginAuthDto } from './dto/loginAuth.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>, 
        private readonly jwtService: JwtService
        ) {}

        async register(dto: RegisterAuthDto) 
        {
            const oldUserEmail = await this.userRepository.findOneBy({email: dto.email})
            const oldUserLogin = await this.userRepository.findOneBy({login: dto.login})

            if (oldUserEmail)
            throw new BadRequestException(
                'User with this email is already in th system'
            )

            if (oldUserLogin)
            throw new BadRequestException(
                'User with this Login is already in th system'
            )

            const salt = await genSalt(10)

            const newUser = this.userRepository.create({
                login: dto.login,
                email: dto.email,
                passwordHash: await hash(dto.passwordHash, salt)
            })

            const user = await this.userRepository.save(newUser)

            const tokens = await this.issueTokenPair(user.id)

            
            return {
                user: this.returnUserFields(user),
            ...tokens
            }
        }

        async issueTokenPair(userId: number) {
            const data = {id: userId}

            const refreshToken = await this.jwtService.signAsync(data, {
                expiresIn: '15d'
            })
    
            const accessToken = await this.jwtService.signAsync(data, {
                expiresIn: '1h'
            })

            return {refreshToken, accessToken}
        }

        async login(dto:LoginAuthDto) {
            const user = await this.validateUser(dto)
            const tokens = await this.issueTokenPair(user.id)

            return {
                user: this.returnUserFields(user),
                ...tokens
            }
        }

        async validateUser(dto: LoginAuthDto): Promise<User> {
            const user = await this.userRepository.findOne({
                where: [
                    {email: dto.email},
             
                ]
            })
            if(!user) throw new UnauthorizedException('User not found')

            const isValidPassword = await compare(dto.passwordHash, user.passwordHash)

            if(!isValidPassword) throw new UnauthorizedException('Inavalid password or login')

            return user
        }

        async getNewToken({refreshToken}: RefreshTokenDto) {
            if(!refreshToken) throw new UnauthorizedException('Please sign in!')
            
            const result = await this.jwtService.verifyAsync(refreshToken)
            if(!result) throw new UnauthorizedException('Invalid token or expired!')

            const user = await this.userRepository.findOneBy({id: result.id})

            const tokens = await this.issueTokenPair(user.id)

            return {
                user: this.returnUserFields(user),
                ...tokens
            }
        }

        returnUserFields(user: User) {
            return {
                id: user.id,
                login: user.login,
                email: user.email,
                isAdmin: user.isAdmin
            }
        }
}
