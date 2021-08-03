import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Testimonial } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ProductService } from '../product/product.service';

const include = {
  PRODUCT: { include: { BRAND: true, CATEGORY: true } },
  USER: true,
};

@Injectable()
export class TestimonialService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductService,
  ) { } // eslint-disable-line

  async findUnique(
    where: Prisma.TestimonialWhereUniqueInput,
  ): Promise<Testimonial> {
    const testimonial = await this.prisma.testimonial.findUnique({
      where,
      include,
    });

    if (!testimonial) throw new NotFoundException('Testimonial not found');

    return testimonial;
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TestimonialWhereUniqueInput;
    where?: Prisma.TestimonialWhereInput;
    orderBy?: Prisma.TestimonialOrderByInput;
  }): Promise<Testimonial[]> {
    return this.prisma.testimonial.findMany({ ...params, include });
  }

  async create(data: Prisma.TestimonialCreateInput): Promise<Testimonial> {
    const testimonial = await this.prisma.testimonial
      .create({
        data,
        include,
      })
      .catch((ex) => {
        throw new InternalServerErrorException(ex.message);
      });

    await this.updateProductRatingByTestimonialsRating(testimonial.PRODUCT_ID);

    return testimonial;
  }

  async update(
    where: Prisma.TestimonialWhereUniqueInput,
    data: Prisma.TestimonialUpdateInput,
  ): Promise<Testimonial> {
    const testimonial = await this.prisma.testimonial
      .update({
        data,
        where,
        include,
      })
      .catch((ex) => {
        throw new InternalServerErrorException(ex.message);
      });

    await this.updateProductRatingByTestimonialsRating(testimonial.PRODUCT_ID);

    return testimonial;
  }

  async delete(
    where: Prisma.TestimonialWhereUniqueInput,
  ): Promise<Testimonial> {
    const testimonial = await this.findUnique(where);
    await this.prisma.testimonial.delete({ where });

    await this.updateProductRatingByTestimonialsRating(testimonial.PRODUCT_ID);

    return testimonial;
  }

  private async updateProductRatingByTestimonialsRating(
    PRODUCT_ID: string,
  ): Promise<void> {
    const testimonialsOfTheProduct = await this.findMany({
      where: { PRODUCT_ID },
    });

    const totalRating = testimonialsOfTheProduct.reduce(
      (sum, thisTestimonial) => sum + thisTestimonial.RATING,
      0,
    );
    const countRatings = testimonialsOfTheProduct.length;
    const RATING = totalRating / countRatings;

    await this.productService
      .update({ ID: PRODUCT_ID }, { RATING })
      .catch((ex) => {
        throw new InternalServerErrorException(ex.message);
      });
  }
}
