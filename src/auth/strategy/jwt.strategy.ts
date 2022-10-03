import { Injectable } from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import {ExtractJwt, Strategy} from "passport-jwt";
import { configService } from "../../config/config.service";
import { User } from "../../entities/User.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor( @InjectRepository(User) private readonly userRepository: Repository<User>) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: true,
                secretOrKey: configService.getJwtConfig()
            }
        );
    }
    async validate({id}: Pick<User, 'id'>) {
        return this.userRepository.findOneBy({id})
    }
}