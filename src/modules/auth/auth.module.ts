import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Environment } from 'src/common/constants/environment';
import { HashPasswordTransformer } from 'src/common/helpers/crypto';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

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
    PrismaService,
    HashPasswordTransformer,
  ],
})
export class AuthModule { } // eslint-disable-line
