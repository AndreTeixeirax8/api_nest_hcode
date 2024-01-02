import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  nome: string;
  @IsEmail()
  email: string;

  //@IsStrongPassword({})
  @IsString()
  senha: string;

  @IsOptional()
  @IsDateString()
  birthAt: Date;
}
