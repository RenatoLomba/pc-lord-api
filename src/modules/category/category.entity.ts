import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryEntity {
  @Field(() => ID)
  ID: string;

  NAME: string;

  CREATED_AT: Date;

  UPDATED_AT: Date;
}
