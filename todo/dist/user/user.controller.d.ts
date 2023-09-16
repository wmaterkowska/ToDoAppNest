import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindEntityParamsDto } from 'src/shared/find-entity-params.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(params: FindEntityParamsDto): Promise<import("./entities/user.entity").User>;
    update(params: FindEntityParamsDto, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(params: FindEntityParamsDto): Promise<string>;
}
