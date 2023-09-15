import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
export declare class AuthService {
    private userService;
    private jwtService;
    private readonly userRepository;
    constructor(userService: UserService, jwtService: JwtService, userRepository: Repository<User>);
    login(email: string, pass: string): Promise<{
        access_token: string;
        user_id: any;
    }>;
}
