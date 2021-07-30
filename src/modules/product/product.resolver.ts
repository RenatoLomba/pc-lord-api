import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlAuthUserGuard } from '../../common/guards/gql-auth-user.guard';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Resolver('Products')
export class ProductResolver {
  constructor(private readonly productService: ProductService) { } // eslint-disable-line

  @Query(() => [ProductEntity])
  @UseGuards(GqlAuthUserGuard)
  async products(): Promise<ProductEntity[]> {
    const products = await this.productService.findMany({
      orderBy: { CREATED_AT: 'desc' },
    });
    return products;
  }
}
