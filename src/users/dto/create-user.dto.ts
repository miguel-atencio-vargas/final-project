import { IsString, IsEmail, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNumber()
  role: number;

  @IsNumber()
  companyId: number;
}
