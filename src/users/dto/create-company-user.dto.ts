import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { RoleUser } from '../enum/roles.enums';

export class CreateCompanyUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsEnum(RoleUser)
  roleEnum: RoleUser;

  @IsString()
  @IsOptional()
  companyId?: string;
}
