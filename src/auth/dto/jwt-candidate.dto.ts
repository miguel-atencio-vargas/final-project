import { IsEmail, IsOptional, IsString } from 'class-validator';

//TODO: its unused
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
