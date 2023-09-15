import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsUnique } from "src/shared/UniqueValidation";

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @IsUnique({ always: true, message: 'Email already in use.' })
  email: string;

}
