import { InputType } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsString({ message: 'Campo "Name" deve ser do tipo string' })
  @IsNotEmpty({ message: 'Campo "Name" deve estar preenchido' })
  @MaxLength(100, { message: 'Campo "Name" deve ter no máximo 100 caracteres' })
  NAME: string;

  @IsString({ message: 'Campo "Description" deve ser do tipo string' })
  @IsNotEmpty({ message: 'Campo "Description" deve estar preenchido' })
  DESCRIPTION: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Campo "Price" deve ser do tipo moeda' },
  )
  @IsNotEmpty({ message: 'Campo "Price" é obrigatório' })
  PRICE: number;

  @IsInt({ message: 'Campo "Qt_Stock" deve ser do tipo inteiro' })
  @IsNotEmpty({ message: 'Campo "Qt_Stock" é obrigatório' })
  QT_STOCK: number;

  @IsString({ message: 'Campo "Category_Id" deve ser do tipo string' })
  @IsNotEmpty({ message: 'Campo "Category_Id" deve estar preenchido' })
  CATEGORY_ID: string;

  @IsString({ message: 'Campo "Brand_Id" deve ser do tipo string' })
  @IsNotEmpty({ message: 'Campo "Brand_Id" deve estar preenchido' })
  BRAND_ID: string;
}
