import { ObjectId } from 'mongoose';

export class TodoM {
    id: ObjectId;
    title: string;
    description: string;
    createdDate: Date;
    updatedDate: Date;
}
