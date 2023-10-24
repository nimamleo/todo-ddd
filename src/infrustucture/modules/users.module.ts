import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from 'src/controller/auth/users.controller';
import { UsersService } from '../service/users.service';
import { User, Usersstchema } from '../schema/user/users.schema';
import { UserRepository } from '../repository/user.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: Usersstchema }]),
  ],
})
export class UsersModule {}
