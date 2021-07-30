import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CategoryEntity as Category } from '../category/category.entity';
import { BrandEntity as Brand } from '../brand/brand.entity';

@ObjectType()
export class ProductEntity {
  @Field(() => ID)
  ID: string;

  NAME: string;

  DESCRIPTION: string;

  PRICE: number;

  QT_STOCK: number;

  @Field(() => Category)
  CATEGORY?: Category;

  CATEGORY_ID?: string;

  @Field(() => Brand)
  BRAND?: Brand;

  BRAND_ID?: string;

  CREATED_AT: Date;

  UPDATED_AT: Date;
}
