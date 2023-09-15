import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { Password } from './entities/password.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Password]), UserModule],
  controllers: [PasswordController],
  providers: [PasswordService, JwtService],
  exports: [PasswordService]
})
export class PasswordModule { }
