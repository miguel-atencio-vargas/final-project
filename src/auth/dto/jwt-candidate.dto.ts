import { IsEmail, IsOptional, IsString } from 'class-validator';

export class JwtCandidateDto {
  @IsString()
  sub: string;

  @IsString()
  jti: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  stageId?: string;
}
