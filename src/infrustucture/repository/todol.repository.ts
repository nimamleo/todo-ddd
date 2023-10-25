import { Injectable } from '@nestjs/common';
import { EntityRepository } from './entity.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from 'src/database/monodb/schema/todo/todo.schema';

@Injectable()
export class TodoRepository extends EntityRepository<TodoDocument> {
    constructor(@InjectModel(Todo.name) TodoModel: Model<TodoDocument>) {
        super(TodoModel);
    }
}
