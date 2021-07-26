import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { UserRoleEntity as UserRole } from '../user-role/user-role.entity';

@ObjectType()
export class UserEntity {
  @Field(() => ID)
  ID: string;

  EMAIL: string;

  FIRST_NAME: string;

  LAST_NAME: string;

  DT_BIRTH: Date;

  CREATED_AT: Date;

  UPDATED_AT: Date;

  @HideField()
  PASSWORD: string;

  @Field(() => [UserRole])
  USER_ROLE?: UserRole[];
}
