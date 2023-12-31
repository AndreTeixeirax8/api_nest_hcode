import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user..dto';

export class UpdateUserDto extends CreateUserDto {
  // @IsNotEmpty()
  id: number;
}
