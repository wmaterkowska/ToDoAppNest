import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';


@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService, private userService: UserService) { }

  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto.id, signInDto.email, signInDto.password)
  }

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    //TODO: signup auth
    return this.userService.create(signUpDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
