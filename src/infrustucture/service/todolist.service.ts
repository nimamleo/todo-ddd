import {
    Injectable,
    NotFoundException,
    ForbiddenException,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ObjectId } from 'mongoose';
import { TodoList, TodoListDocument } from '../schema/todo/todolist.schema';
import { Todo, TodoDocument } from '../schema/todo/todo.schema';
import { UserRepository } from '../repository/user.repository';
import { CreateTodolistDto } from 'src/common/validation/todo/create-todolist.dto';
import { User } from '../schema/user/users.schema';
import { CreateTodoDto } from 'src/common/validation/todo/create-todo.dto';
import { UpdateTodoDto } from 'src/common/validation/todo/update-todo.dto';

@Injectable()
export class TodolistService {
    constructor(
        @InjectModel(TodoList.name)
        private todolistModel: Model<TodoListDocument>,
        @InjectModel(Todo.name)
        private todoModel: Model<TodoDocument>,
        private readonly userRepository: UserRepository,
    ) {}

    async createTodolist(createTodolistDto: CreateTodolistDto, user: User) {
        const isExist = await this.todolistModel.findOne({
            listTitle: createTodolistDto.listTitle,
        });
        if (isExist) throw new ForbiddenException('this data already exist');
        console.log(createTodolistDto);
        
        const todolist = await this.todolistModel.create({
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
        await this.checkExist(this.todolistModel, { _id: id });
        return this.todolistModel.findById(id);
    }
    async getAllTodolist(user: User) {
        return this.todolistModel.find({ owner: user._id });
    }
    async deleteTodolist(id: string, user: User) {
        await this.checkExist(this.todolistModel, { _id: id });
        const res = await this.todolistModel.deleteOne({ _id: id });
        if (res.deletedCount > 1) {
            return res;
        }
    }

    async createTodo(
        createTodoDto: CreateTodoDto,
        user: User,
        todolistId: ObjectId,
    ) {
        await this.checkExist(this.todolistModel, { _id: todolistId  , owner:user._id});
        const data = await this.todoModel.findOne({
            title: createTodoDto.title,
        });
        if (data) throw new ForbiddenException('this data already exist');
        const addTodoResult = await this.todolistModel.updateOne(
            { _id: todolistId, owner: user._id },
            { $push: { todos: createTodoDto } },
            { lean: true },
        );

        if (addTodoResult.modifiedCount > 0) return addTodoResult;
    }
    async getAllTodo(todolistId: ObjectId, user: User) {
        await this.checkExist(this.todolistModel, { _id: todolistId });

        await this.checkExist(this.todolistModel, { _id: todolistId });
        return this.todolistModel.findOne(
            { _id: todolistId, owner: user._id },
            { todos: 1 },
        );
    }
    async updatateTodo(
        updateTodoDto: UpdateTodoDto,
        user: User,
        todoId: ObjectId,
    ) {
        const updateResult = await this.todolistModel.updateOne(
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
        const removeResult = await this.todolistModel.updateOne(
            { 'todos._id': todoId },
            { $pull: { todos: { _id: todoId } } },
        );
        if (removeResult.modifiedCount == 0)
            throw new InternalServerErrorException('can not remove todo');
        return removeResult;
    }

    async checkExist<T>(model: Model<T>, query: FilterQuery<unknown>) {
        const data = await model.findOne(query);
        if (!data) throw new NotFoundException('data not found');
        return !!data;
    }
}
