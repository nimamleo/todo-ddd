import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, ObjectId } from 'mongoose';
import { TodoM } from 'src/domain/model/todo.model';

@Schema({ timestamps: true })
export class Todo extends TodoM {
    _id: ObjectId;

    @Prop()
    title: string;

    @Prop()
    description: string;
}

export type TodoDocument = HydratedDocument<Document & Todo>;

export const TodoSchema = SchemaFactory.createForClass(Todo);
