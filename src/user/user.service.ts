import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByemailId(emailId: string): Promise<User | undefined> {
    return this.userRepository.findByUserEmailId(emailId);
  }

  async findByUserId(userId: string): Promise<User | undefined> {
    return this.userRepository.findByUserId(userId);
  }

  async addNewUser(userDto: UserDto) {
    const user: User = {
      id: uuid(),
      emailId: userDto.emailId,
      password: userDto.password,
      lastName: userDto.lastName,
      firstName: userDto.firstName,
      companyName: userDto.companyName,
    };

    return this.userRepository.insertUser(user);
  }

  async listAll() {
    return this.userRepository.listAll();
  }
}
