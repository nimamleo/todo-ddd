import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import {  ConfigService } from '@nestjs/config';
import { AuthController } from 'src/controller/http/auth/auth.controller';
import { AuthService } from '../../app/service/auth.service';
import { JwtStrategy } from '../Auth/strategies/jwt.strategy';
import { UserRepository } from '../repository/user.repository';
import { User, Usersstchema } from 'src/database/monodb/schema/user/users.schema';

@Module({
    controllers: [AuthController],
    providers: [AuthService, UserRepository, JwtStrategy],
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: Usersstchema }]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secretOrPrivateKey: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: 3600,
                },
            }),
        }),
    ],
})
export class AuthModule {}
