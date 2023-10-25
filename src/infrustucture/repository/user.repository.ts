import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    User,
    UserDocument,
} from 'src/database/monodb/schema/user/users.schema';
import { EntityRepository } from './entity.repository';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
    ) {
        super(userModel);
    }
}
