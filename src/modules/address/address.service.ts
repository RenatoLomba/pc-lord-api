import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Address, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import fetch from 'node-fetch';
import { CEPType } from 'src/common/types/CEP.type';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) { } // eslint-disable-line

  public async createAddress(
    data: Prisma.AddressCreateInput,
  ): Promise<Address> {
    const cep = await this.getCEPInfos(data.CEP);

    return this.prisma.address.create({
      data: {
        ...data,
        STREET: cep.logradouro,
        DISTRICT: cep.bairro,
        CITY: cep.localidade,
        STATE: cep.uf,
      },
    });
  }

  public async findAddress(
    addressWhereUniqueInput: Prisma.AddressWhereUniqueInput,
  ): Promise<Address> {
    return this.prisma.address.findUnique({ where: addressWhereUniqueInput });
  }

  public async findAddresses(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AddressWhereUniqueInput;
    where?: Prisma.AddressWhereInput;
    orderBy?: Prisma.AddressOrderByInput;
  }): Promise<Address[]> {
    return this.prisma.address.findMany({ ...params });
  }

  public async updateAddress(
    where: Prisma.AddressWhereUniqueInput,
    data: Prisma.AddressUpdateInput,
  ): Promise<Address> {
    let address: Address;
    if (!data.CEP) {
      address = address = await this.prisma.address.update({ where, data });
    } else {
      const cep = await this.getCEPInfos(String(data.CEP));

      address = await this.prisma.address.update({
        where,
        data: {
          ...data,
          STREET: cep.logradouro,
          DISTRICT: cep.bairro,
          CITY: cep.localidade,
          STATE: cep.uf,
        },
      });
    }

    return address;
  }

  public async deleteAddress(ID: string): Promise<Address> {
    return this.prisma.address.delete({ where: { ID } });
  }

  private async getCEPInfos(CEP: string): Promise<CEPType> {
    const response = await fetch(`https://viacep.com.br/ws/${CEP}/json/`)
      .then(async (res) => await res.json())
      .catch((ex) => {
        throw new InternalServerErrorException(ex.message);
      });

    if (response.erro) {
      throw new BadRequestException('CEP Inválido');
    }

    return response;
  }
}
