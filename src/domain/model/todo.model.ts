import { IEntity } from 'src/common/interface/entity.interface';
import { IDated } from 'src/common/interface/date.interface';

export interface ITodo {
    title: string;
    description: string;
}

export interface ITodoEntity extends IEntity, IDated, ITodo {}
