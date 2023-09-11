import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }


  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    const user = new User();
    user.email = email;
    user.password = password;
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.findOneBy({ id });
    if (!updatedUser) {
      throw new NotFoundException(`User with Id ${id} not found.`)
    }
    const { password } = updateUserDto;
    updatedUser.password = password;
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: number) {
    await this.userRepository.delete(id)
    return `User with #${id} was removed.`;
  }
}
