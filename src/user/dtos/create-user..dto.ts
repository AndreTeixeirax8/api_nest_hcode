import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nome: string;
  @IsEmail()
  email: string;

  //@IsStrongPassword({})
  @IsString()
  senha: string;
}
