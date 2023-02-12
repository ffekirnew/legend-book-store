import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './entities/user.entity';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const user: User = new User();

        user.salt = await bcrypt.genSalt();
        user.username = authCredentialsDto.username;
        user.password = await this.hashPassword(authCredentialsDto.password, user.salt);

        try {
            await this.userRepository.save(user);
        } catch (error) {
            if (error.code == "23505") {
                throw new ConflictException(`User with the username ${user.username} already exists. Pick another username.`);
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async logIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accesToken: string }> {
        const username: string = await this.validateUserCredentials(authCredentialsDto);

        if (!username) {
            throw new UnauthorizedException(`Something is wrong.`);
        }

        const payload: JwtPayload = { username };
        const accesToken = await this.jwtService.sign(payload);

        return { accesToken };
    }

    async validateUserCredentials(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        let { username, password } = authCredentialsDto;

        const user: User = await this.userRepository.findOne({ where: { username } });

        if (user && await user.checkPassword(password)) {
            return username;
        } else {
            return null;
        }
    }

    async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
}
