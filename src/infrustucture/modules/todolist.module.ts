import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodolistController } from 'src/controller/http/todo/todolist.controller';
import { TodolistService } from '../../app/service/todolist.service';
import { TodoList, TodoListSchema } from '../schema/todo/todolist.schema';
import { Todo, TodoSchema } from '../schema/todo/todo.schema';
import { User, Usersstchema } from '../schema/user/users.schema';
import { TodolistRepository } from '../repository/todolist.repository';
import { UserRepository } from '../repository/user.repository';
import { TodoRepository } from '../repository/todol.repository';

@Module({
    controllers: [TodolistController],
    providers: [
        TodolistService,
        TodolistRepository,
        UserRepository,
        TodoRepository,
    ],
    imports: [
        MongooseModule.forFeature([
            { name: TodoList.name, schema: TodoListSchema },
            { name: Todo.name, schema: TodoSchema },
            { name: User.name, schema: Usersstchema },
        ]),
    ],
})
export class TodolistModule {}
