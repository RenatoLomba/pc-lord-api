import { Controller, Get } from '@nestjs/common';
import { Role } from '@prisma/client';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) { } // eslint-disable-line

  @Get()
  async roles(): Promise<Role[]> {
    return this.roleService.findRoles({});
  }
}
