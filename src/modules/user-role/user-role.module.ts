import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRoleService } from './user-role.service';

@Module({
  providers: [PrismaService, UserRoleService],
})
export class UserRoleModule { } // eslint-disable-line
