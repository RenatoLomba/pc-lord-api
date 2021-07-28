import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AddressEntity {
  @Field(() => ID)
  ID: string;

  USER_ID?: string;

  STREET: string;

  NUMBER: string;

  DISTRICT: string;

  CITY: string;

  STATE: string;

  CEP: string;

  COMPLEMENT?: string;

  CREATED_AT: Date;

  UPDATED_AT: Date;
}
