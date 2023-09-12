import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private userService: UserService, private jwtService: JwtService) { }

  async login(id: number, email: string, pass: string) {
    const user = await this.userService.findOne(id);
    const isMatchPassword = await bcrypt.compare(user.password, pass);
    if (isMatchPassword || user?.email !== email) {
      throw new UnauthorizedException();
    }

    // TODO: Generate a JWT and return it here
    // instead of the user object
    // TODO: Hash password
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user_id: user.id,
    };
  }


}
