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

  // TODO: change to @IsMongoId
  @IsNumber()
  companyId: number;
}
