import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {

  constructor(@InjectRepository(Todo) private todoRepository: Repository<Todo>) { }


  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const { title, content } = createTodoDto;
    const todo = new Todo();
    todo.title = title;
    todo.content = content;
    return await this.todoRepository.save(todo);
  }

  async findAllForUser(userId: string): Promise<Todo[]> {
    return await this.todoRepository.find({ where: { userId: userId } });
  }

  async findOne(id: number) {
    return await this.todoRepository.findOneBy({ id });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const updatedTodo = await this.todoRepository.findOneBy({ id });
    if (!updatedTodo) {
      throw new NotFoundException(`Todo with Id ${id} not found.`)
    }
    const { title, content, done } = updateTodoDto;
    updatedTodo.title = title !== undefined ? title : updatedTodo.title;
    updatedTodo.content = content !== undefined ? content : updatedTodo.content;
    updatedTodo.done = done !== undefined ? done : updatedTodo.done;
    updatedTodo.lastChange = new Date();
    return await this.todoRepository.save(updatedTodo);
  }

  async remove(id: number): Promise<String> {
    await this.todoRepository.delete(id);
    return `Todo with #${id} was removed.`;
  }
}
