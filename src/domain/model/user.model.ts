import { TodoM } from "./todo.model";

export class UserWithoutPassword {
    id: number;
    username: string;
    todolists:TodoM[]
}

export class UserM extends UserWithoutPassword {
    password: string;
}
