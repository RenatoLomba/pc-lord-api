import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddressResolver } from './address.resolver';
import { AddressService } from './address.service';

@Module({
  imports: [],
  providers: [PrismaService, AddressService, AddressResolver],
})
export class AddressModule { } // eslint-disable-line
