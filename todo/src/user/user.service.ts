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
    const { username, email } = createUserDto;

    const user = new User();
    user.username = username;
    user.email = email;

    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find({ relations: ["password", "todos"] });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.findOneBy({ id });
    if (!updatedUser) {
      throw new NotFoundException(`User with Id ${id} not found.`)
    }
    const { username, email } = updateUserDto;
    if (username) {
      updatedUser.username = username;
    }
    if (email) {
      updatedUser.email = email;
    }

    return await this.userRepository.save(updatedUser);
  }

  async remove(id: number) {
    const userToDelete = await this.userRepository.findOneBy({ id });
    if (!userToDelete) {
      throw new NotFoundException(`User with Id ${id} not found.`)
    }
    await this.userRepository.delete(userToDelete.id)
    return `User with #${id} was removed.`;
  }
}
