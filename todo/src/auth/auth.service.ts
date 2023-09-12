import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor(private userService: UserService, private jwtService: JwtService) { }

  async signIn(id: number, email: string, pass: string) {
    const user = await this.userService.findOne(id);
    if (user?.password !== pass || user?.email !== email) {
      throw new UnauthorizedException();
    }

    // TODO: Generate a JWT and return it here
    // instead of the user object
    // TODO: Hash password
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }


  async signUp(email: string, pass: string) {
    const createUser: CreateUserDto = { email: email, password: pass };

    return this.userService.create(createUser);
  }

}
