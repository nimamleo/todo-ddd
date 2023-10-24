import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { TodoList, TodoListDocument } from '../schema/todo/todolist.schema';
import { UserRepository } from './user.repository';
import { CreateTodolistDto } from 'src/common/validation/todo/create-todolist.dto';
import { User } from '../schema/user/users.schema';

@Injectable()
export class TodolistRepository {
    constructor(
        @InjectModel(TodoList.name)
        private todolistModel: Model<TodoListDocument>,
        private readonly userRepository: UserRepository,
    ) {}

    async create(
        createEntityData: CreateTodolistDto,
        user: User,
    ): Promise<any> {
        const IstodolistExist = await this.todolistModel.findOne({
            title: createEntityData.listTitle,
        });

        if (IstodolistExist)
            throw new InternalServerErrorException(
                'this todolist already exist',
            );

        const todolist = await this.todolistModel.create({
            ...createEntityData,
            owner: user._id,
        });
        await this.userRepository.findOneAndUpdate(
            { _id: user._id },
            { $push: { todolists: todolist } },
        );

        user.todolists.push(todolist.id);
        return todolist;
    }

    async findOne(
        entityFilterQuery: FilterQuery<TodoList>,
        projection?: Record<string, unknown>,
    ): Promise<TodoList | null> {
        await this.checkIsExist(entityFilterQuery);
        return this.todolistModel
            .findOne(entityFilterQuery, {
                __v: 0,
                ...projection,
            })
            .exec();
    }

    async find(
        entityFilterQuery: FilterQuery<TodoList>,
    ): Promise<TodoList[] | null> {
        const todolists = await this.todolistModel.find(entityFilterQuery);
        return todolists;
    }

    async findOneAndUpdate(
        entityFilterQuery: FilterQuery<TodoList>,
        updateEntityData: UpdateQuery<unknown>,
    ): Promise<TodoList | null> {
        await this.checkIsExist(entityFilterQuery);
        return this.todolistModel.findOneAndUpdate(
            entityFilterQuery,
            updateEntityData,
            {
                new: true,
            },
        );
    }

    async deleteOne(
        entityFilterQuery: FilterQuery<TodoList>,
    ): Promise<boolean> {
        await this.checkIsExist(entityFilterQuery);
        const deleteResult =
            await this.todolistModel.deleteOne(entityFilterQuery);
        return deleteResult.deletedCount >= 1;
    }

    async checkIsExist(query: FilterQuery<unknown>) {
        const res = await this.todolistModel.findOne(query);
        if (!res) throw new NotFoundException('data not found');
        return !!res;
    }
}
