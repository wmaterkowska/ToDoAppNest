import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from 'src/user/entities/user.entity';
import { Password } from './entities/password.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PasswordService {

  //TODO all methods
  constructor(@InjectRepository(Password) private readonly passwordRepository: Repository<Password>,
    private readonly userService: UserService) { }


  async create(userId: number, createPasswordDto: CreatePasswordDto) {
    const { password } = createPasswordDto;

    const newPassword = new Password();
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    newPassword.hash = hashedPassword;
    newPassword.userId = userId;

    return await this.passwordRepository.save(newPassword);
  }

  // findAll() {
  //   return `This action returns all password`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} password`;
  // }

  async findOneByUserId(userId: number) {
    return await this.passwordRepository.findOneBy({ userId });
  }

  async update(userId: number, updatePasswordDto: UpdatePasswordDto) {
    const { password } = updatePasswordDto;
    // const user = await this.userService.findOneById(userId);
    // if (!user) {
    //   throw new NotFoundException(`User with Id ${userId} not found.`)
    // }
    const updatedPassword = await this.passwordRepository.findOneBy({ userId: userId });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    updatedPassword.hash = hashedPassword;

    return await this.passwordRepository.save(updatedPassword);
  }

  async remove(id: number) {
    return await this.passwordRepository.delete(id);
  }
}
