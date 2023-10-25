import { Injectable } from '@nestjs/common';
import { EntityRepository } from './entity.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoList, TodoListDocument } from 'src/database/monodb/schema/todo/todolist.schema';

@Injectable()
export class TodolistRepository extends EntityRepository<TodoListDocument> {
    constructor(
        @InjectModel(TodoList.name) TodolistModel: Model<TodoListDocument>,
    ) {
        super(TodolistModel);
    }
}
