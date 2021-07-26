import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

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

  @IsDateString({}, { message: 'Campo "Dt_Birth" deve ser to tipo data' })
  @IsNotEmpty({ message: 'Campo "Dt_Birth" é obrigatório' })
  DT_BIRTH: Date | string;
}
