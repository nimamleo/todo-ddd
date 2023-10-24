import { ObjectId } from 'mongoose';
import { UserM } from './user.model';

export class TodoM {
    id: ObjectId;
    listTitle: string;
    todos:TodoM[]
    owner:UserM
}
