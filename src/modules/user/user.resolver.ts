import { Resolver, Query, Args } from '@nestjs/graphql';
import { QueryUserInput } from './dto/query-user.input';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) { } // eslint-disable-line

  @Query(() => [UserEntity])
  async users(): Promise<UserEntity[]> {
    return this.userService.findUsers({});
  }

  @Query(() => UserEntity)
  async user(@Args('query') query: QueryUserInput): Promise<UserEntity> {
    return this.userService.findUser(query);
  }
}
