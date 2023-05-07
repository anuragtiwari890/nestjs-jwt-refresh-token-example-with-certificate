import { Controller, Get, UseGuards, Request, Body, Post } from '@nestjs/common';
import { User } from './user';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/gaurds';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('tokenInfo')
  async getUserInfoByToken(@Request() req): Promise<User> {
    return req.user;
  }

  // Just using add user 
  @Post('add')
  async add(@Body() userDto: UserDto): Promise<User> {
    return this.userService.addNewUser(userDto);
  }

  @Get('listAll')
  async listAll(): Promise<User[]> {
    return this.userService.listAll();
  }
}
