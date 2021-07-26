import { Module } from '@nestjs/common';
import { HashPasswordTransformer } from 'src/common/helpers/crypto';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    UserResolver,
    PrismaService,
    HashPasswordTransformer,
  ],
})
export class UserModule { } // eslint-disable-line
