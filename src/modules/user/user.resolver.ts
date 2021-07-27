import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Prisma, User } from '@prisma/client';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { GqlAuthUserGuard } from 'src/common/guards/gql-auth-user.guard';
import { QueryUserInput } from './dto/query-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) { } // eslint-disable-line

  @Query(() => [UserEntity])
  @UseGuards(GqlAuthUserGuard)
  async users(): Promise<UserEntity[]> {
    return this.userService.findUsers({});
  }

  @Query(() => UserEntity)
  @UseGuards(GqlAuthUserGuard)
  async user(@Args('query') query: QueryUserInput): Promise<UserEntity> {
    return this.userService.findUser(query);
  }

  @Mutation(() => UserEntity)
  @UseGuards(GqlAuthUserGuard)
  async updateLoggedUser(
    @CurrentUser() user: User,
    @Args('data') data: UpdateUserInput,
  ): Promise<UserEntity> {
    return this.userService.updateUser({ where: { ID: user.ID }, data });
  }

  @Mutation(() => UserEntity)
  @UseGuards(GqlAuthUserGuard)
  async deleteLoggedUser(@CurrentUser() user: User): Promise<UserEntity> {
    return this.userService.deleteUser({ ID: user.ID });
  }
}
