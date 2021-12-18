import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNumber } from 'class-validator';

export class PutUserDto {
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
  @IsNumber()
  role: number;

  @ApiProperty()
  @IsNumber()
  companyId: number;
}
