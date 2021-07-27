import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthAdminGuard } from 'src/common/guards/auth-admin.guard';
import { CreateUserInput } from './dto/create-user.input';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { } // eslint-disable-line

  @Get()
  @UseGuards(AuthAdminGuard)
  async users(): Promise<User[]> {
    return this.userService.findUsers({});
  }

  @Post()
  @UseGuards(AuthAdminGuard)
  async create(@Body() data: CreateUserInput): Promise<User> {
    return this.userService.createUser(data);
  }
}
