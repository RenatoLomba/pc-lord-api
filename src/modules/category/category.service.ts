import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { } // eslint-disable-line

  public async createCategory(
    data: Prisma.CategoryCreateInput,
  ): Promise<Category> {
    const category = await this.prisma.category.create({ data });
    return category;
  }

  public async findCategories(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CategoryWhereUniqueInput;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByInput;
  }): Promise<Category[]> {
    return this.prisma.category.findMany({ ...params });
  }

  public async updateCategory(
    where: Prisma.CategoryWhereUniqueInput,
    data: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    return this.prisma.category.update({ data, where });
  }

  public async deleteCategory(ID: string): Promise<Category> {
    return this.prisma.category.delete({ where: { ID } });
  }
}
