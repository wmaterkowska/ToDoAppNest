import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Pick<CreateUserDto, "password">>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
