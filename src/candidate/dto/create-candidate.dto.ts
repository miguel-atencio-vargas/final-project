import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateCandidateDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  uid?: string;

  @IsOptional()
  @IsString()
  openingId?: string;

  @IsOptional()
  @IsString()
  stageId?: string;
}
