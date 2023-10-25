import { IEntity } from 'src/common/interface/entity.interface';
import { ITodoEntity } from './todo.model';
import { IDated } from 'src/common/interface/date.interface';

export interface IUser {
    username: string;
    todolists: ITodoEntity[];
}

export interface IUserEntity extends IUser, IEntity, IDated {
    password: string;
}
