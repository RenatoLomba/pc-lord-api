import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from '../user/dto/create-user.input';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) { } // eslint-disable-line

  @Mutation(() => AuthType)
  async login(@Args('data') data: AuthInput): Promise<AuthType> {
    return this.authService.validateUser(data);
  }

  @Mutation(() => AuthType)
  async signUp(@Args('data') data: CreateUserInput): Promise<AuthType> {
    return this.authService.registerUser(data);
  }
}
