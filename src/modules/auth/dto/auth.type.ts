import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity as User } from 'src/modules/user/user.entity';

@ObjectType()
export class AuthType {
  @Field(() => User)
  user: User;

  token: string;
}
