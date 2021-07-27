import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Environment } from 'src/common/constants/environment';
import { HashPasswordTransformer } from 'src/common/helpers/crypto';
import { PrismaService } from '../prisma/prisma.service';
import { RoleService } from '../role/role.service';
import { UserRoleService } from '../user-role/user-role.service';
import { UserService } from '../user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtAdminStrategy } from './jwt-admin.strategy';
import { JwtUserStrategy } from './jwt-user.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: Environment.jwtSecret,
        signOptions: { expiresIn: Environment.jwtExpiresIn },
      }),
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    UserService,
    UserRoleService,
    RoleService,
    PrismaService,
    HashPasswordTransformer,
    JwtUserStrategy,
    JwtAdminStrategy,
  ],
})
export class AuthModule { } // eslint-disable-line
