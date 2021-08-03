import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TestimonialService } from './testimonial.service';
import { TestimonialEntity as Testimonial } from './testimonial.entity';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { GqlAuthUserGuard } from 'src/common/guards/gql-auth-user.guard';
import { CreateTestimonialInput } from './dto/create-testimonial.input';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { UpdateTestimonialInput } from './dto/update-testimonial.input';
import { UserLoggedIn } from 'src/common/types/user-logged-in.type';
import { Cons } from 'src/common/constants/cons';

@Resolver('Testimonials')
export class TestimonialResolver {
  constructor(private readonly testimonialService: TestimonialService) { } // eslint-disable-line

  @Query(() => [Testimonial])
  @UseGuards(GqlAuthUserGuard)
  async testimonialsByProduct(
    @Args('product_id') PRODUCT_ID?: string,
  ): Promise<Testimonial[]> {
    return this.testimonialService.findMany({
      orderBy: { CREATED_AT: 'desc' },
      where: { PRODUCT_ID: { equals: PRODUCT_ID } },
    });
  }

  @Query(() => [Testimonial])
  @UseGuards(GqlAuthUserGuard)
  async userLoggedTestimonials(
    @CurrentUser() user: User,
  ): Promise<Testimonial[]> {
    return this.testimonialService.findMany({
      orderBy: { CREATED_AT: 'desc' },
      where: { USER_ID: { equals: user.ID } },
    });
  }

  @Mutation(() => Testimonial)
  @UseGuards(GqlAuthUserGuard)
  async createTestimonial(
    @Args('data')
    { RATING, TITLE, DESCRIPTION, PRODUCT_ID }: CreateTestimonialInput,
    @CurrentUser() user: User,
  ): Promise<Testimonial> {
    return this.testimonialService.create({
      RATING,
      TITLE,
      DESCRIPTION,
      PRODUCT: { connect: { ID: PRODUCT_ID } },
      USER: { connect: { ID: user.ID } },
    });
  }

  @Mutation(() => Testimonial)
  @UseGuards(GqlAuthUserGuard)
  async updateTestimonial(
    @Args('id') ID: string,
    @Args('data') data: UpdateTestimonialInput,
    @CurrentUser() user: UserLoggedIn,
  ): Promise<Testimonial> {
    const testimonial = await this.testimonialService.findUnique({ ID });

    const userIsAdmin = user.USER_ROLE.find(
      (userRole) => userRole.ROLE.NAME === Cons.roleAdminName,
    );

    if (testimonial.USER_ID !== user.ID && !userIsAdmin) {
      throw new UnauthorizedException(
        'Somente o usuário que criou o Testimonial pode alterá-lo',
      );
    }

    return this.testimonialService.update({ ID }, { ...data });
  }

  @Mutation(() => Testimonial)
  @UseGuards(GqlAuthUserGuard)
  async deleteTestimonial(
    @Args('id') ID: string,
    @CurrentUser() user: User,
  ): Promise<Testimonial> {
    const testimonial = await this.testimonialService.findUnique({ ID });

    if (testimonial.USER_ID !== user.ID) {
      throw new UnauthorizedException(
        'Somente o usuário que criou o Testimonial pode alterá-lo',
      );
    }

    return this.testimonialService.delete({ ID });
  }
}
