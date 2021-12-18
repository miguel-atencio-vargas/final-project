import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateCandidateDto {
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
  @IsOptional()
  @IsString()
  uid?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  openingId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  stageId?: string;
}
