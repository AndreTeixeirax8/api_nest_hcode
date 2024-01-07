import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

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

  @IsOptional()
  @IsEnum(Role)
  role: number;
}
