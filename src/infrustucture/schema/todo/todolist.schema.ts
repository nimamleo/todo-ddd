import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, ObjectId } from 'mongoose';
import { Todo, TodoSchema } from './todo.schema';
import { TodoM } from 'src/domain/model/todo.model';

@Schema({ timestamps: true })
export class TodoList extends TodoM {
    _id: ObjectId;

    @Prop({ required: true })
    listTitle: string;

    @Prop({ required: true })
    owner: string;

    @Prop({ type: [TodoSchema] })
    todos: Todo[];
}

export type TodoListDocument = HydratedDocument<TodoList & Document>;

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
