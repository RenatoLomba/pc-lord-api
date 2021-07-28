import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateCategoryInput {
  @IsString({ message: 'Campo "Nome" deve ser do tipo string' })
  @IsNotEmpty({ message: 'Campo "Nome" é obrigatório' })
  @IsOptional()
  NAME?: string;
}
