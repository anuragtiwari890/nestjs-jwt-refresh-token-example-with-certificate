import { Injectable } from '@nestjs/common';
import { User } from './user';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserRepository {
  users: User[] = [
    {
      id: uuid(),
      emailId: 'anurag@temp.com',
      password: '12345',
      firstName: 'Anurag',
      lastName: 'tiwari',
      companyName: 'mywork',
    },
  ];

  insertUser(user: User) {
    this.users.push(user);
    return user;
  }

  findByUserId(userId: string) {
    return this.users.filter((it) => it.id === userId)[0];
  }

  findByUserEmailId(emailId: string) {
    return this.users.filter((it) => it.emailId === emailId)[0];
  }
}
