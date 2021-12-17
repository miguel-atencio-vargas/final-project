import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

@Exclude()
export class PatchInternalCandidateDto {
  @Expose()
  @IsOptional()
  @IsEmail()
  email?: string;

  @Expose()
  @IsString()
  @IsOptional()
  firstName?: string;

  @Expose()
  @IsOptional()
  @IsString()
  lastName?: string;

  @Expose()
  @IsOptional()
  @IsString()
  uid?: string;

  @Expose()
  @IsOptional()
  @IsString()
  openingId?: string;

  @Expose()
  @IsOptional()
  @IsString()
  stageId?: string;
}