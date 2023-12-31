import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { FindEntityParamsDto } from 'src/shared/find-entity-params.dto';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    create(createTodoDto: CreateTodoDto): Promise<import("./entities/todo.entity").Todo>;
    findAll(userId: string): Promise<import("./entities/todo.entity").Todo[]>;
    update(param: FindEntityParamsDto, updateTodoDto: UpdateTodoDto): Promise<import("./entities/todo.entity").Todo>;
    remove(params: FindEntityParamsDto): Promise<String>;
}
