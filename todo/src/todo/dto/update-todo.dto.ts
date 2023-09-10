import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {

  @IsString()
  title?: string;

  @IsString()
  content?: string;

  @IsBoolean()
  done?: boolean

}
