import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PasswordModule } from 'src/password/password.module';
import { UserService } from 'src/user/user.service';
import { PasswordService } from 'src/password/password.service';

@Module({
  imports: [PasswordModule, UserModule, JwtModule.registerAsync({
    useFactory: async (config: ConfigService) => ({
      global: true,
      secret: config.get<string>('SECRET'),
      signOptions: { expiresIn: '3600s' }
    }),
    inject: [ConfigService, UserService, PasswordService],
    imports: [UserModule, PasswordModule]
  }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }