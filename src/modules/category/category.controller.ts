import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { AuthAdminGuard } from '../../common/guards/auth-admin.guard';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) { } // eslint-disable-line

  @Post()
  @UseGuards(AuthAdminGuard)
  public async createCategory(
    @Body() data: CreateCategoryInput,
  ): Promise<Category> {
    return this.categoryService.createCategory(data).catch((ex) => {
      throw new InternalServerErrorException(ex.message);
    });
  }

  @Get()
  @UseGuards(AuthAdminGuard)
  public async categories(): Promise<Category[]> {
    return this.categoryService.findCategories({});
  }

  @Put(':id')
  @UseGuards(AuthAdminGuard)
  public async updateCategory(
    @Param('id') ID: string,
    @Body() data: UpdateCategoryInput,
  ): Promise<Category> {
    return this.categoryService.updateCategory({ ID }, { ...data });
  }

  @Delete(':id')
  @UseGuards(AuthAdminGuard)
  public async deleteCategory(@Param('id') ID: string): Promise<Category> {
    return this.categoryService.deleteCategory(ID).catch((ex) => {
      throw new InternalServerErrorException(ex);
    });
  }
}
