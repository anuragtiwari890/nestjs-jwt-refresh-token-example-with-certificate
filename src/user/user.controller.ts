import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { User } from './user';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/gaurds';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('getUserInfoByToken')
  async getUserInfoByToken(@Request() req): Promise<User> {
    return req.user;
  }
}
