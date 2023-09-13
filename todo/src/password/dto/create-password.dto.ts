import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreatePasswordDto {

  @IsString()
  hash: string;

  @IsNotEmpty()
  user: User;
}
