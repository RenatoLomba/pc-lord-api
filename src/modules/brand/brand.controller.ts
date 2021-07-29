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
import { Brand } from '@prisma/client';
import { AuthAdminGuard } from 'src/common/guards/auth-admin.guard';
import { BrandService } from './brand.service';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) { } // eslint-disable-line

  @Post()
  @UseGuards(AuthAdminGuard)
  async createBrand(@Body() data: CreateBrandInput): Promise<Brand> {
    return this.brandService.create(data);
  }

  @Get()
  @UseGuards(AuthAdminGuard)
  async findAll(): Promise<Brand[]> {
    return this.brandService.findServices({});
  }

  @Put(':id')
  @UseGuards(AuthAdminGuard)
  async updateBrand(
    @Param('id') ID: string,
    @Body() data: UpdateBrandInput,
  ): Promise<Brand> {
    return this.brandService.update({ ID }, { ...data });
  }

  @Delete(':id')
  @UseGuards(AuthAdminGuard)
  async deleteBrand(@Param('id') ID: string): Promise<Brand> {
    return this.brandService.delete({ ID });
  }
}
