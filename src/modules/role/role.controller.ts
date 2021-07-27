import { Controller, Get, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { AuthAdminGuard } from 'src/common/guards/auth-admin.guard';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) { } // eslint-disable-line

  @Get()
  @UseGuards(AuthAdminGuard)
  async roles(): Promise<Role[]> {
    return this.roleService.findRoles({});
  }
}
