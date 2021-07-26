import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RoleEntity as Role } from '../role/role.entity';

@ObjectType()
export class UserRoleEntity {
  @Field(() => ID)
  ID: string;

  USER_ID: string;

  @Field(() => Role)
  ROLE?: Role;

  ROLE_ID: string;

  CREATED_AT: string;

  UPDATED_AT: string;
}
