import { Resolver, Query } from '@nestjs/graphql';
import { BrandEntity as Brand } from './brand.entity';
import { BrandService } from './brand.service';

@Resolver('Brands')
export class BrandResolver {
  constructor(private readonly brandService: BrandService) { } // eslint-disable-line

  @Query(() => [Brand])
  async brands(): Promise<Brand[]> {
    return this.brandService.findServices({});
  }
}
