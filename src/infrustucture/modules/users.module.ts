import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from 'src/controller/http/auth/users.controller';
import { UsersService } from '../../app/service/users.service';
import { UserRepository } from '../repository/user.repository';
import { User, Usersstchema } from 'src/database/monodb/schema/user/users.schema';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: Usersstchema }]),
  ],
})
export class UsersModule {}
