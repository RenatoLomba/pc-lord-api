import { InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class AuthInput {
  @IsNotEmpty({ message: 'Campo "Email" é obrigatório' })
  @IsEmail(
    { allow_ip_domain: false },
    { message: 'Campo "Email" deve ser um e-mail válido' },
  )
  EMAIL: string;

  @IsString({ message: 'Campo "Password" deve ser do tipo texto' })
  @IsNotEmpty({ message: 'Campo "Password" é obrigatório' })
  @MinLength(8, {
    message: 'Campo "Password" deve ter entre 8 e 16 caracteres',
  })
  @MaxLength(16, {
    message: 'Campo "Password" deve ter entre 8 e 16 caracteres',
  })
  PASSWORD: string;
}
