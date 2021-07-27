import { InputType } from '@nestjs/graphql';
import {
  IsDate,
  // IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty({ message: 'Campo "Email" é obrigatório' })
  @IsEmail(
    { allow_ip_domain: false },
    { message: 'Campo "Email" deve ser um e-mail válido' },
  )
  EMAIL: string;

  @IsString({ message: 'Campo "First_Name" deve ser do tipo texto' })
  @IsNotEmpty({ message: 'Campo "First_Name" é obrigatório' })
  FIRST_NAME: string;

  @IsString({ message: 'Campo "First_Name" deve ser do tipo texto' })
  @IsNotEmpty({ message: 'Campo "First_Name" é obrigatório' })
  LAST_NAME: string;

  @IsDate({ message: 'Campo "Dt_Birth" deve ser to tipo data' })
  @IsNotEmpty({ message: 'Campo "Dt_Birth" é obrigatório' })
  DT_BIRTH: Date;

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
