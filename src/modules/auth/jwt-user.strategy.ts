import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Environment } from 'src/common/constants/environment';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(
  Strategy,
  'jwt-user-strategy',
) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Environment.jwtSecret,
    });
  }

  async validate({ sub }: { sub: User['ID']; username: string }) {
    const user = await this.userService.findUser({ ID: sub });

    if (!user) throw new UnauthorizedException('Usuário não autenticado');

    return user;
  }
}
