import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { HashPasswordTransformer } from 'src/common/helpers/crypto';
import { PrismaService } from '../prisma/prisma.service';

const include = { USER_ROLE: { include: { ROLE: true } }, ADDRESS: true };

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private hasher: HashPasswordTransformer,
  ) { } // eslint-disable-line

  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include,
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByInput;
  }): Promise<User[]> {
    const { cursor, orderBy, skip, take, where } = params;
    return this.prisma.user.findMany({
      cursor,
      orderBy,
      skip,
      take,
      where,
      include,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    data.PASSWORD = this.hasher.to(data.PASSWORD);
    return this.prisma.user.create({
      data,
      include,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { data, where } = params;

    if (
      data.PASSWORD &&
      typeof data.PASSWORD === 'string' &&
      data.PASSWORD.length > 0
    ) {
      data.PASSWORD = this.hasher.to(data.PASSWORD);
    }

    return this.prisma.user.update({ data, where, include });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where, include });
  }
}
