import { IsDate, IsString } from "class-validator";

export class CreateTodoDto {
  @IsString()
  title?: string;

  @IsString()
  text: string;

  @IsDate()
  lastUpdate: Date;
}
