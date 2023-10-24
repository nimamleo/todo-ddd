import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../schema/user/users.schema';
import { CreateUserDto } from 'src/common/validation/todo/create-user.dto';

@Injectable()
export class UserRepository  {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
    ) {}

    async findOne(
        entityFilterQuery: FilterQuery<User>,
        projection?: Record<string, unknown>,
        path?: string,
    ): Promise<User | null> {
        return this.userModel
            .findOne(entityFilterQuery, {
                __v: 0,
                ...projection,
            })
            .populate(path)
            .exec();
    }

    async find(entityFilterQuery: FilterQuery<User>): Promise<User[] | null> {
        return this.userModel.find(entityFilterQuery);
    }

    async create(createEntityData: CreateUserDto): Promise<any> {
        const user = await this.userModel.findOne({
            username: createEntityData.username,
        });

        if (user)
            throw new InternalServerErrorException('this user already exist');

        const password = await bcrypt.hash(createEntityData.password, 10);
        console.log(password);

        return this.userModel.create({ ...createEntityData, password });
    }

    async findOneAndUpdate(
        entityFilterQuery: FilterQuery<User>,
        updateEntityData: UpdateQuery<unknown>,
    ): Promise<User | null> {
        await this.checkIsExist(entityFilterQuery);
        return this.userModel.findOneAndUpdate(
            entityFilterQuery,
            updateEntityData,
            {
                new: true,
            },
        );
    }

    async deleteOne(entityFilterQuery: FilterQuery<User>): Promise<boolean> {
        await this.checkIsExist(entityFilterQuery);
        const deleteResult = await this.userModel.deleteOne(entityFilterQuery);
        return deleteResult.deletedCount >= 1;
    }

    async checkIsExist(query: FilterQuery<unknown>) {
        const res = await this.userModel.findOne(query);
        if (!res) throw new NotFoundException('data not found');
        return !!res;
    }
}
