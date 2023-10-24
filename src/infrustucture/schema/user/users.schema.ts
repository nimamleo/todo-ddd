import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { TodoList } from '../todo/todolist.schema';
import { UserM } from 'src/domain/model/user.model';

export type UserDocument = HydratedDocument<Document & User>;

@Schema({ timestamps: true })
export class User extends UserM{
    _id: ObjectId;

    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop({
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Todolist',
        default: [],
    })
    todolists: TodoList[];
}

export const Usersstchema = SchemaFactory.createForClass(User);
