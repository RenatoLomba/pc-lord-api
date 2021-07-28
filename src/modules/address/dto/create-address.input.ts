import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateAddressInput {
  @IsNotEmpty({ message: 'Campo "Street" é obrigatório' })
  @IsString({ message: 'Campo "Street" deve ser do tipo string' })
  STREET: string;

  @IsNotEmpty({ message: 'Campo "Number" é obrigatório' })
  @IsString({ message: 'Campo "Number" deve ser do tipo string' })
  @MaxLength(7, { message: 'Campo "Number" deve ter no máximo 7 caracteres' })
  NUMBER: string;

  @IsNotEmpty({ message: 'Campo "District" é obrigatório' })
  @IsString({ message: 'Campo "District" deve ser do tipo string' })
  DISTRICT: string;

  @IsNotEmpty({ message: 'Campo "City" é obrigatório' })
  @IsString({ message: 'Campo "City" deve ser do tipo string' })
  CITY: string;

  @IsNotEmpty({ message: 'Campo "State" é obrigatório' })
  @IsString({ message: 'Campo "State" deve ser do tipo string' })
  STATE: string;

  @IsNotEmpty({ message: 'Campo "CEP" é obrigatório' })
  @IsString({ message: 'Campo "CEP" deve ser do tipo string' })
  @MaxLength(8, { message: 'Campo "CEP" deve ter no máximo 8 caracteres' })
  CEP: string;

  @IsNotEmpty({ message: 'Campo "Complement" é obrigatório' })
  @IsString({ message: 'Campo "Complement" deve ser do tipo string' })
  @IsOptional()
  COMPLEMENT?: string;
}
