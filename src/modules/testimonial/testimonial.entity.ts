import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserEntity as User } from '../user/user.entity';
import { ProductEntity as Product } from '../product/product.entity';

@ObjectType()
export class TestimonialEntity {
  @Field(() => ID)
  ID: string;

  TITLE?: string;

  DESCRIPTION?: string;

  RATING: number;

  PRODUCT_ID?: string;

  @Field(() => Product)
  PRODUCT?: Product;

  USER_ID?: string;

  @Field(() => User)
  USER?: User;

  CREATED_AT: Date;

  UPDATED_AT: Date;
}
