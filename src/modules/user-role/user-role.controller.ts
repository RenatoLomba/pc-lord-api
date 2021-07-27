import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { AuthAdminGuard } from 'src/common/guards/auth-admin.guard';
import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';
import { CreateUserRoleInput } from './dto/create-user-role.input';
import { UserRoleService } from './user-role.service';

@Controller('user-roles')
export class UserRoleController {
  constructor(
    private userRoleService: UserRoleService,
    private userService: UserService,
    private roleService: RoleService,
  ) { } // eslint-disable-line

  @Post()
  @UseGuards(AuthAdminGuard)
  async create(@Body() data: CreateUserRoleInput): Promise<UserRole> {
    const USER = await this.userService.findUser({ ID: data.USER_ID });
    const ROLE = await this.roleService.findRole({ ID: data.ROLE_ID });
    return this.userRoleService.createUserRole({
      ROLE: {
        connect: { ID: ROLE.ID },
      },
      USER: {
        connect: { ID: USER.ID },
      },
    });
  }
}
