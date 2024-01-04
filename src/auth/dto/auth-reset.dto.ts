import { IsJWT, IsString } from 'class-validator';

export class AuthResetDto {
  @IsString()
  senha: string;

  @IsJWT()
  token: string;
}
