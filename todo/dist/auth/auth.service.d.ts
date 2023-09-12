import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(id: number, email: string, pass: string): Promise<{
        access_token: string;
        user_id: number;
    }>;
}
