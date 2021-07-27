import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthAdminGuard extends AuthGuard('jwt-admin-strategy') { } // eslint-disable-line
