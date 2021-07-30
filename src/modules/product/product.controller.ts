import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { AuthAdminGuard } from 'src/common/guards/auth-admin.guard';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { } // eslint-disable-line

  @Post()
  @UseGuards(AuthAdminGuard)
  async createProduct(@Body() data: CreateProductInput): Promise<Product> {
    return this.productService.create(data);
  }

  @Get()
  @UseGuards(AuthAdminGuard)
  async findAllProducts(): Promise<Product[]> {
    return this.productService.findMany({});
  }

  @Get(':id')
  @UseGuards(AuthAdminGuard)
  async findProduct(@Param('id') ID: string): Promise<Product> {
    return this.productService.findUnique({ ID });
  }

  @Put(':id')
  @UseGuards(AuthAdminGuard)
  async updateProduct(
    @Param('id') ID: string,
    @Body() data: UpdateProductInput,
  ): Promise<Product> {
    return this.productService.update({ ID }, { ...data });
  }

  @Delete(':id')
  @UseGuards(AuthAdminGuard)
  async deleteProduct(@Param('id') ID: string): Promise<Product> {
    return this.productService.delete({ ID });
  }
}
