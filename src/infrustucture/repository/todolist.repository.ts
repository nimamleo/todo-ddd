import { Injectable } from '@nestjs/common';
import { EntityRepository } from './entity.repository';
import { TodoList, TodoListDocument } from '../schema/todo/todolist.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TodolistRepository extends EntityRepository<TodoListDocument> {
    constructor(
        @InjectModel(TodoList.name) TodolistModel: Model<TodoListDocument>,
    ) {
        super(TodolistModel);
    }
}
