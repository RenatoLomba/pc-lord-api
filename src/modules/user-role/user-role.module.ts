import { Module } from '@nestjs/common';
import { HashPasswordTransformer } from 'src/common/helpers/crypto';
import { PrismaService } from '../prisma/prisma.service';
import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';
import { UserRoleController } from './user-role.controller';
import { UserRoleService } from './user-role.service';

@Module({
  imports: [],
  controllers: [UserRoleController],
  providers: [
    PrismaService,
    UserRoleService,
    UserService,
    RoleService,
    HashPasswordTransformer,
  ],
})
export class UserRoleModule { } // eslint-disable-line
