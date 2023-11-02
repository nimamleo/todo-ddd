import {
    Injectable,
    NotFoundException,
    ForbiddenException,
    InternalServerErrorException,
} from '@nestjs/common';
import { FilterQuery, ObjectId } from 'mongoose';
import { UserRepository } from '../../infrustucture/repository/user.repository';
import { CreateTodolistDto } from 'src/common/validation/todo/create-todolist.dto';
import { CreateTodoDto } from 'src/common/validation/todo/create-todo.dto';
import { UpdateTodoDto } from 'src/common/validation/todo/update-todo.dto';
import { TodolistRepository } from 'src/infrustucture/repository/todolist.repository';
import { TodoRepository } from 'src/infrustucture/repository/todol.repository';
import { User } from 'src/database/monodb/schema/user/users.schema';

@Injectable()
export class TodolistService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly todoListRepository: TodolistRepository,
        private readonly todoRepository: TodoRepository,
    ) {}

    async createTodolist(createTodolistDto: CreateTodolistDto, user: User) {
        const isExist = await this.todoListRepository.findOne({
            listTitle: createTodolistDto.listTitle,
        });
        if (isExist) {
            throw new ForbiddenException('this data already exist');
        }

        const todolist = await this.todoListRepository.create({
            ...createTodolistDto,
            owner: user,
        });

        await this.userRepository.updateOne(
            { _id: user._id },
            { $push: { todolists: todolist } },
        );
        return todolist;
    }
    async getOneTodolist(id: string, user: User) {
        await this.checkExist({ _id: id });
        return this.todoListRepository.findOne({ _id: id });
    }
    async getAllTodolist(user: User) {
        return this.todoListRepository.find({ owner: user._id });
    }
    async deleteTodolist(id: string, user: User) {
        await this.checkExist({ _id: id });
        const deletedCount = await this.todoListRepository.deleteOne({
            _id: id,
            owner: user._id,
        });
        if (deletedCount) {
            return {
                data: true,
            };
        }
    }

    async createTodo(
        createTodoDto: CreateTodoDto,
        user: User,
        todolistId: ObjectId,
    ) {
        await this.checkExist({
            _id: todolistId,
            owner: user._id,
        });
        const data = await this.todoRepository.findOne({
            title: createTodoDto.title,
        });
        if (data) throw new ForbiddenException('this data already exist');
        const addTodoResult = await this.todoListRepository.updateOne(
            { _id: todolistId, owner: user._id },
            { $push: { todos: createTodoDto } },
            {
                returnDocument: 'after',
                projection: {
                    todos: 1,
                },
            },
        );

        if (addTodoResult) return addTodoResult;
    }
    async getAllTodo(todolistId: ObjectId, user: User) {
        await this.checkExist({ _id: todolistId });

        const res = await this.todoListRepository.findOne(
            { _id: todolistId, owner: user._id },
            { listTitle: 0, _id: 0, owner: 0, createdAt: 0, updatedAt: 0 },
        );
        return res;
    }
    async updatateTodo(
        updateTodoDto: UpdateTodoDto,
        user: User,
        todoId: ObjectId,
    ) {
        const updateResult = await this.todoListRepository.updateOne(
            { 'todos._id': todoId, owner: user._id },
            {
                $set: {
                    'todos.$.title': updateTodoDto.title,
                    'todos.$.description': updateTodoDto.description,
                },
            },
            {
                new: true,
            },
        );
        if (updateResult)
            throw new InternalServerErrorException('update failed');
        return updateResult;
    }
    async deleteTodo(user: User, todoId: ObjectId) {
        const removeResult = await this.todoListRepository.updateOne(
            { 'todos._id': todoId },
            { $pull: { todos: { _id: todoId } } },
            {
                new: true,
            },
        );
        if (removeResult)
            throw new InternalServerErrorException('can not remove todo');
        return removeResult;
    }

    async checkExist<T>(query: FilterQuery<unknown>) {
        const data = await this.todoListRepository.findOne(query);
        if (!data) throw new NotFoundException('data not found');
        return !!data;
    }
}
