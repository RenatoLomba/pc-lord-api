import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) { } // eslint-disable-line

  async findRole(
    roleWhereUniqueInput: Prisma.RoleWhereUniqueInput,
  ): Promise<Role> {
    const role = this.prisma.role.findUnique({ where: roleWhereUniqueInput });
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async findRoles(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RoleWhereUniqueInput;
    where?: Prisma.RoleWhereInput;
    orderBy?: Prisma.RoleOrderByInput;
  }): Promise<Role[]> {
    return this.prisma.role.findMany({ ...params });
  }
}
