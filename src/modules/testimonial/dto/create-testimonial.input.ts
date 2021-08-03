import { InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateTestimonialInput {
  @IsNumber(
    { maxDecimalPlaces: 1 },
    { message: 'Campo "Rating" deve ser do tipo numérico com 1 casa decimal' },
  )
  @IsNotEmpty({ message: 'Campo "Rating" é obrigatório' })
  @Max(5, { message: 'Campo "Rating" deve ter o valor máximo de 5' })
  RATING: number;

  @IsString({ message: 'Campo "Title" deve ser do tipo string' })
  @IsNotEmpty({ message: 'Campo "Title" deve estar preenchido' })
  @MaxLength(100, {
    message: 'Campo "Title" deve ter no máximo 100 caracteres',
  })
  @IsOptional()
  TITLE?: string;

  @IsString({ message: 'Campo "Description" deve ser do tipo string' })
  @IsNotEmpty({ message: 'Campo "Description" deve estar preenchido' })
  @MaxLength(400, {
    message: 'Campo "Description" deve ter no máximo 400 caracteres',
  })
  @IsOptional()
  DESCRIPTION?: string;

  @IsString({ message: 'Campo "Product_Id" deve ser do tipo string' })
  @IsNotEmpty({ message: 'Campo "Product_Id" deve estar preenchido' })
  PRODUCT_ID: string;
}
