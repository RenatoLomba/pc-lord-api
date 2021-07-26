import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class QueryUserInput {
  @IsNotEmpty({ message: 'Campo "Email" não pode estar vazio' })
  @IsEmail(
    { allow_ip_domain: false },
    { message: 'Campo "Email" deve ser um e-mail válido' },
  )
  @IsOptional()
  EMAIL?: string;

  @IsString({ message: 'Campo "Id" deve ser do tipo string' })
  @IsNotEmpty({ message: 'Campo "Id" não pode estar vazio' })
  @IsOptional()
  ID?: string;
}
