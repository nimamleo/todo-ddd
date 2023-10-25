import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument, ObjectId } from 'mongoose';
import { Todo, TodoSchema } from './todo.schema';
import { User } from '../user/users.schema';

@Schema({ timestamps: true })
export class TodoList {
    _id: ObjectId;

    @Prop({ required: true })
    listTitle: string;

    @Prop({
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true,
    })
    owner: User;

    @Prop({ type: [TodoSchema] })
    todos: Todo[];

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export type TodoListDocument = HydratedDocument<TodoList & Document>;

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
