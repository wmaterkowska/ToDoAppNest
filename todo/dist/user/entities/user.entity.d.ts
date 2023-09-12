import { Todo } from "src/todo/entities/todo.entity";
export declare class User {
    id: number;
    email: string;
    password: string;
    todos: Todo[];
    validatePassword(password: string): Promise<boolean>;
}
