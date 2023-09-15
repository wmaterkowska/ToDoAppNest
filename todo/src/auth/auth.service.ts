import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { PasswordService } from 'src/password/password.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreatePasswordDto } from 'src/password/dto/create-password.dto';

@Injectable()
export class AuthService {

  constructor(private userService: UserService, private passwordService: PasswordService, private jwtService: JwtService) { }

  async login(signInDto: SignInDto) {

    const { email, password } = signInDto;
    const user = await this.userService.findOneByEmail(email);
    const passwordFromDatabase = (await this.passwordService.findOneByUserId(user.id)).hash

    const isMatchPassword = await bcrypt.compare(password, passwordFromDatabase);
    if (!isMatchPassword) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user_id: user.id,
    };
  }


  async signup(signUpDto: SignUpDto) {
    const { username, email, password } = signUpDto;

    const createUserDto: CreateUserDto = { username: username, email: email };
    const createPasswordDto: CreatePasswordDto = { password: password }

    const newUser = await this.userService.create(createUserDto);
    await this.passwordService.create(newUser.id, createPasswordDto);

    return true;
  }

}
