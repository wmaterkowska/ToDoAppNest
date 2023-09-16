import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
export declare class TodoService {
    private todoRepository;
    private userService;
    constructor(todoRepository: Repository<Todo>, userService: UserService);
    create(userId: number, createTodoDto: CreateTodoDto): Promise<Todo>;
    findAllForUser(userId: number): Promise<Todo[]>;
    update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo>;
    remove(id: number): Promise<String>;
}
