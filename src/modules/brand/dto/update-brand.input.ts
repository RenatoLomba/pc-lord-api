import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateBrandInput {
  @IsString({ message: 'Campo "Nome" deve ser do tipo string' })
  @IsNotEmpty({ message: 'Campo "Nome" é obrigatório' })
  @IsOptional()
  NAME?: string;
}
