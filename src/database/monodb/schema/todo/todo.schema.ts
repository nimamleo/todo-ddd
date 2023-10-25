import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, ObjectId } from 'mongoose';
import { ITodo } from 'src/domain/model/todo.model';

@Schema({ timestamps: true })
export class Todo  {
    _id: ObjectId;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    createdAt: Date;
    
    @Prop()
    updatedAt: Date;
}

export type TodoDocument = HydratedDocument<Document & Todo>;

export const TodoSchema = SchemaFactory.createForClass(Todo);
