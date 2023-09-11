import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Todo } from "src/todo/entities/todo.entity";

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

}
