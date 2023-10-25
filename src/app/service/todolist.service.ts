import {
    Injectable,
    NotFoundException,
    ForbiddenException,
    InternalServerErrorException,
} from '@nestjs/common';
import { FilterQuery, ObjectId } from 'mongoose';
import { UserRepository } from '../../infrustucture/repository/user.repository';
import { CreateTodolistDto } from 'src/common/validation/todo/create-todolist.dto';
import { User } from '../../infrustucture/schema/user/users.schema';
import { CreateTodoDto } from 'src/common/validation/todo/create-todo.dto';
import { UpdateTodoDto } from 'src/common/validation/todo/update-todo.dto';
import { TodolistRepository } from 'src/infrustucture/repository/todolist.repository';
import { TodoRepository } from 'src/infrustucture/repository/todol.repository';

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
        if (isExist) throw new ForbiddenException('this data already exist');

        const todolist = await this.todoListRepository.create({
            ...createTodolistDto,
            owner: user._id,
        });
        await this.userRepository.findOneAndUpdate(
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
        );

        if (addTodoResult.modifiedCount > 0) return addTodoResult;
    }
    async getAllTodo(todolistId: ObjectId, user: User) {
        await this.checkExist({ _id: todolistId });

        await this.checkExist({ _id: todolistId });
        return this.todoListRepository.findOne(
            { _id: todolistId, owner: user._id },
            { todos: 1 },
        );
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
        );
        if (updateResult.modifiedCount == 0)
            throw new InternalServerErrorException('update failed');
        return updateResult;
    }
    async deleteTodo(user: User, todoId: ObjectId) {
        const removeResult = await this.todoListRepository.updateOne(
            { 'todos._id': todoId },
            { $pull: { todos: { _id: todoId } } },
        );
        if (removeResult.modifiedCount == 0)
            throw new InternalServerErrorException('can not remove todo');
        return removeResult;
    }

    async checkExist<T>(query: FilterQuery<unknown>) {
        const data = await this.todoListRepository.findOne(query);
        if (!data) throw new NotFoundException('data not found');
        return !!data;
    }
}
