import { Injectable } from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {InjectRepository } from "@nestjs/typeorm";
import {ExtractJwt, Strategy} from "passport-jwt";
import { User } from "../../entities/User.entity";
import { Repository } from "typeorm";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
         @InjectRepository(User) private readonly userRepository: Repository<User>) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: true,
                // secretOrKey: configService.getJwtConfig()
                secretOrKey: 'megasecret'
            }
        );
    }

    async validate(payload: any) {
        const user = await this.userRepository.findOne({
            where: {
                id: payload.id
            }
        });
        return user
      }
}