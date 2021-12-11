import { IsString, IsEmail, IsEnum } from 'class-validator';
import { RoleUser } from '../enum/roles.enums';

export class CreateCompanyUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsEnum(RoleUser)
  rolEnum: RoleUser;

  @IsString()
  companyId: string;
}
