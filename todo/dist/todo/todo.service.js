"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const todo_entity_1 = require("./entities/todo.entity");
const typeorm_2 = require("typeorm");
let TodoService = class TodoService {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    async create(createTodoDto) {
        const { title, content } = createTodoDto;
        const todo = new todo_entity_1.Todo();
        todo.title = title;
        todo.content = content;
        return await this.todoRepository.save(todo);
    }
    async findAllForUser(userId) {
        return await this.todoRepository.find({ where: { userId: userId } });
    }
    async findOne(id) {
        return await this.todoRepository.findOneBy({ id });
    }
    async update(id, updateTodoDto) {
        const updatedTodo = await this.todoRepository.findOneBy({ id });
        if (!updatedTodo) {
            throw new common_1.NotFoundException(`Todo with Id ${id} not found.`);
        }
        const { title, content, done } = updateTodoDto;
        updatedTodo.title = title !== undefined ? title : updatedTodo.title;
        updatedTodo.content = content !== undefined ? content : updatedTodo.content;
        updatedTodo.done = done !== undefined ? done : updatedTodo.done;
        updatedTodo.lastChange = new Date();
        return await this.todoRepository.save(updatedTodo);
    }
    async remove(id) {
        await this.todoRepository.delete(id);
        return `Todo with #${id} was removed.`;
    }
};
exports.TodoService = TodoService;
exports.TodoService = TodoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_entity_1.Todo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TodoService);
//# sourceMappingURL=todo.service.js.map