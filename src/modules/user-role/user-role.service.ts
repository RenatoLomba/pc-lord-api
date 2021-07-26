import { Injectable } from '@nestjs/common';
import { Prisma, UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRoleService {
  constructor(private prisma: PrismaService) { } // eslint-disable-line

  async createUserRole(data: Prisma.UserRoleCreateInput): Promise<UserRole> {
    return this.prisma.userRole.create({ data });
  }
}
