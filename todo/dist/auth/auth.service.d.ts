import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { PasswordService } from 'src/password/password.service';
export declare class AuthService {
    private userService;
    private passwordService;
    private jwtService;
    constructor(userService: UserService, passwordService: PasswordService, jwtService: JwtService);
    login(signInDto: SignInDto): Promise<{
        access_token: string;
        user_id: number;
    }>;
    signup(signUpDto: SignUpDto): Promise<boolean>;
}
