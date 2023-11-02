import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongoose';
import { UserRepository } from '../../infrustucture/repository/user.repository';
import { CreateAuthDto } from 'src/common/validation/auth/create-auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) {}
    async signinLocal(dto: CreateAuthDto) {
        const user = await this.userRepository.findOne({
            username: dto.username,
        });
        if (!user)
            throw new InternalServerErrorException('credential not valid');
        const comparePassword = await bcrypt.compare(
            dto.password,
            user.password,
        );
        if (!comparePassword)
            throw new InternalServerErrorException('credential not valid');
        const token = await this.signUser(user._id, user.username, 'user');
        return { token };
    }

    async signupLocal(dto: CreateAuthDto) {
        const isUserExist = await this.userRepository.findOne({
            username: dto.username,
        });

        if (isUserExist)
            throw new InternalServerErrorException('user already exist');
        const hash =await bcrypt.hash(dto.password, 10);
        
        const user = this.userRepository.create({ ...dto, password: hash });
        return user;
    }

    async signUser(userId: ObjectId, username: string, type: string) {
        return this.jwtService.sign({
            sub: userId,
            username,
            type,
        });
    }
}
