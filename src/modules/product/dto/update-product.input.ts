import { InputType, PartialType } from '@nestjs/graphql';
import { IsInt, IsOptional, Max } from 'class-validator';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @IsInt({ message: 'Campo "Num_Views" deve ser do tipo inteiro' })
  @Max(1, {
    message:
      'Campo "Num_Views" deve ter o valor máximo de 1 para adicionar às visualizações atuais',
  })
  @IsOptional()
  NUM_VIEWS?: number;
} // eslint-disable-line
