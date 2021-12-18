import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum } from 'class-validator';
import { RoleUser } from '../enum/roles.enums';

export class CreateCompanyUserDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEnum(RoleUser)
  roleEnum: RoleUser;
}
