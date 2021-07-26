import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRoleInput {
  @IsString({ message: 'Campo "User_Id" deve ser do tipo string' })
  @IsNotEmpty({ message: 'Campo "User_Id" é obrigatório' })
  USER_ID: string;

  @IsString({ message: 'Campo "Role_Id" deve ser do tipo string' })
  @IsNotEmpty({ message: 'Campo "Role_Id" é obrigatório' })
  ROLE_ID: string;
}
