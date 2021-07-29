import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BrandController } from './brand.controller';
import { BrandResolver } from './brand.resolver';
import { BrandService } from './brand.service';

@Module({
  imports: [],
  controllers: [BrandController],
  providers: [PrismaService, BrandService, BrandResolver],
})
export class BrandModule { } // eslint-disable-line
