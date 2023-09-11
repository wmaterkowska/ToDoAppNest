import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {
  @IsString()
  title?: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  done?: boolean;

}
