import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Environment } from 'src/common/constants/environment';
import { UserService } from '../user/user.service';
import { Role, User, UserRole } from '@prisma/client';
import { Cons } from 'src/common/constants/cons';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(
  Strategy,
  'jwt-admin-strategy',
) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Environment.jwtSecret,
    });
  }

  async validate({ sub }: { sub: User['ID']; username: string }) {
    const user = (await this.userService.findUser({ ID: sub })) as User & {
      USER_ROLE: (UserRole & {
        ROLE: Role;
      })[];
    };

    if (!user) throw new UnauthorizedException('Usuário não autenticado');

    const hasRoleAdmin = user.USER_ROLE.find(
      (userRole) => userRole.ROLE.NAME === Cons.roleAdminName,
    );

    if (!hasRoleAdmin)
      throw new UnauthorizedException('Acesso apenas para Administradores');

    return user;
  }
}
