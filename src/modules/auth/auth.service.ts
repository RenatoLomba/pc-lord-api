import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { Cons } from 'src/common/constants/cons';
import { RoleService } from '../role/role.service';
import { UserRoleService } from '../user-role/user-role.service';
import { CreateUserInput } from '../user/dto/create-user.input';
import { UserService } from '../user/user.service';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private roleService: RoleService,
    private userRoleService: UserRoleService,
  ) { } // eslint-disable-line

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this.userService.findUser({ EMAIL: data.EMAIL });

    const isValidPassord = compareSync(data.PASSWORD, user.PASSWORD);

    if (!isValidPassord) throw new UnauthorizedException('Incorrect Password');

    const token = await this.jwtToken(user);

    return { user, token };
  }

  async registerUser(data: CreateUserInput): Promise<AuthType> {
    const userCreated = await this.userService.createUser(data);
    const role = await this.roleService.findRole({ NAME: Cons.roleUserName });
    await this.userRoleService.createUserRole({
      ROLE: { connect: { ID: role.ID } },
      USER: { connect: { ID: userCreated.ID } },
    });

    const user = await this.userService.findUser({ ID: userCreated.ID });

    const token = await this.jwtToken(user);

    return { user, token };
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = { username: user.FIRST_NAME, sub: user.ID };
    return this.jwtService.signAsync(payload);
  }
}
