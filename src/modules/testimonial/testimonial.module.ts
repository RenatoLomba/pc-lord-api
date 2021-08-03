import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductService } from '../product/product.service';
import { TestimonialResolver } from './testimonial.resolver';
import { TestimonialService } from './testimonial.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    ProductService,
    TestimonialService,
    TestimonialResolver,
  ],
})
export class TestimonialModule { } // eslint-disable-line
