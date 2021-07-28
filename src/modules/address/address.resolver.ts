import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { GqlAuthUserGuard } from 'src/common/guards/gql-auth-user.guard';
import { AddressEntity as Address } from './address.entity';
import { AddressService } from './address.service';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';

@Resolver('Address')
export class AddressResolver {
  constructor(private addressService: AddressService) { } // eslint-disable-line

  @Mutation(() => Address)
  @UseGuards(GqlAuthUserGuard)
  public async createUserLoggedAddress(
    @Args('data') data: CreateAddressInput,
    @CurrentUser() user: User,
  ): Promise<Address> {
    return this.addressService.createAddress({
      ...data,
      USER: { connect: { ID: user.ID } },
    });
  }

  @Query(() => Address)
  @UseGuards(GqlAuthUserGuard)
  public async userLoggedAddress(
    @Args('ID') ID: string,
    @CurrentUser() user: User,
  ): Promise<Address> {
    const address = await this.addressService.findAddress({ ID });

    if (address.USER_ID !== user.ID) {
      throw new UnauthorizedException(
        'Usuário só tem acesso a seus próprios endereços',
      );
    }

    return address;
  }

  @Query(() => [Address])
  @UseGuards(GqlAuthUserGuard)
  public async userLoggedAddresses(
    @CurrentUser() user: User,
  ): Promise<Address[]> {
    const addresses = await this.addressService.findAddresses({
      where: { USER_ID: user.ID },
    });
    return addresses;
  }

  @Mutation(() => Address)
  @UseGuards(GqlAuthUserGuard)
  public async updateLoggedUserAddress(
    @CurrentUser() user: User,
    @Args('ID') ID: string,
    @Args('data') data: UpdateAddressInput,
  ): Promise<Address> {
    const address = await this.addressService.findAddress({ ID });

    if (address.USER_ID !== user.ID) {
      throw new UnauthorizedException(
        'Usuário só tem acesso a seus próprios endereços',
      );
    }

    return this.addressService.updateAddress({ ID }, { ...data });
  }

  @Mutation(() => Address)
  @UseGuards(GqlAuthUserGuard)
  public async deleteLoggedUserAddress(
    @CurrentUser() user: User,
    @Args('ID') ID: string,
  ): Promise<Address> {
    const address = await this.addressService.findAddress({ ID });

    if (address.USER_ID !== user.ID) {
      throw new UnauthorizedException(
        'Usuário só tem acesso a seus próprios endereços',
      );
    }

    return this.addressService.deleteAddress(address.ID);
  }
}
