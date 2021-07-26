import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [],
  controllers: [RoleController],
  providers: [PrismaService, RoleService],
})
export class RoleModule { } // eslint-disable-line
