import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @IsString({ message: 'Campo "Nome" deve ser do tipo string' })
  @IsNotEmpty({ message: 'Campo "Nome" é obrigatório' })
  NAME: string;
}
