import { IDated } from 'src/common/interface/date.interface';
import { ITodoEntity } from './todo.model';
import { IUserEntity } from './user.model';
import { IEntity } from 'src/common/interface/entity.interface';

export interface ITodoList {
    listTitle: string;
    todos: ITodoEntity[];
    owner: IUserEntity;
}

export interface ITodoListEntity extends IEntity, ITodoList {}
