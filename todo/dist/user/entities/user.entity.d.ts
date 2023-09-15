import 'reflect-metadata';
import { Todo } from "src/todo/entities/todo.entity";
import { Password } from "src/password/entities/password.entity";
export declare class User {
    id: number;
    username: string;
    email: string;
    password: Password;
    todos: Todo[];
}
