import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Brand, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) { } // eslint-disable-line

  async create(data: Prisma.BrandCreateInput): Promise<Brand> {
    return this.prisma.brand.create({ data }).catch((ex) => {
      throw new InternalServerErrorException(ex.message);
    });
  }

  async findServices(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BrandWhereUniqueInput;
    where?: Prisma.BrandWhereInput;
    orderBy?: Prisma.BrandOrderByInput;
  }): Promise<Brand[]> {
    return this.prisma.brand.findMany({ ...params });
  }

  async update(
    where: Prisma.BrandWhereUniqueInput,
    data: Prisma.BrandUpdateInput,
  ): Promise<Brand> {
    return this.prisma.brand.update({ data, where }).catch((ex) => {
      throw new InternalServerErrorException(ex.message);
    });
  }

  async delete(where: Prisma.BrandWhereUniqueInput): Promise<Brand> {
    return this.prisma.brand.delete({ where }).catch((ex) => {
      throw new InternalServerErrorException(ex.message);
    });
  }
}
