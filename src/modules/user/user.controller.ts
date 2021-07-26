import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserInput } from './dto/create-user.input';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { } // eslint-disable-line

  @Get()
  async users(): Promise<User[]> {
    return this.userService.findUsers({});
  }

  @Post()
  async create(@Body() data: CreateUserInput): Promise<User> {
    return this.userService.createUser(data);
  }
}
