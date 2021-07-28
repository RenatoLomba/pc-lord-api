import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlAuthUserGuard } from 'src/common/guards/gql-auth-user.guard';
import { CategoryEntity as Category } from './category.entity';
import { CategoryService } from './category.service';

@Resolver('Category')
export class CategoryResolver {
  constructor(private service: CategoryService) { } // eslint-disable-line

  @Query(() => [Category])
  @UseGuards(GqlAuthUserGuard)
  public async categories(): Promise<Category[]> {
    return this.service.findCategories({});
  }
}
