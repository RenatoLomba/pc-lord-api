import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const include = { BRAND: true, CATEGORY: true };

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) { } // eslint-disable-line

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({ data, include });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByInput;
  }): Promise<Product[]> {
    return this.prisma.product.findMany({ ...params, include }).catch((ex) => {
      throw new InternalServerErrorException(ex.message);
    });
  }

  async findUnique(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where, include });
    if (!product) throw new NotFoundException('Produto não encontrado');
    return product;
  }

  async update(
    where: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    await this.findUnique({ ID: where.ID });

    return this.prisma.product.update({ data, where, include }).catch((ex) => {
      throw new InternalServerErrorException(ex.message);
    });
  }

  async delete(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    await this.findUnique({ ID: where.ID });

    return this.prisma.product.delete({ where, include }).catch((ex) => {
      throw new InternalServerErrorException(ex.message);
    });
  }
}
