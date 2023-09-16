import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { FindEntityParamsDto } from 'src/shared/find-entity-params.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserId } from 'src/auth/decorator/get-user-id.decorator';

@UseGuards(AuthGuard)
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post()
  create(@UserId() userId: number, @Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(userId, createTodoDto);
  }

  @Get()
  findAll(@UserId() userId: number) {
    return this.todoService.findAllForUser(userId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.todoService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param() param: FindEntityParamsDto, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(param.id, updateTodoDto);
  }

  @Delete(':id')
  remove(@UserId() userId: number, @Param() params: FindEntityParamsDto) {
    return this.todoService.remove(params.id);
  }
}
