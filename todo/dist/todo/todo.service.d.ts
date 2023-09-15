import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
export declare class TodoService {
    private todoRepository;
    constructor(todoRepository: Repository<Todo>);
    create(userId: number, createTodoDto: CreateTodoDto): Promise<Todo>;
    findAllForUser(userId: number): Promise<Todo[]>;
    findOne(id: number): Promise<Todo>;
    update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo>;
    remove(id: number): Promise<String>;
}
