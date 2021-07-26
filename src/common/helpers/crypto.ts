import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';

@Injectable()
export class HashPasswordTransformer {
  to(password: string): string {
    return hashSync(password, 10);
  }
}
