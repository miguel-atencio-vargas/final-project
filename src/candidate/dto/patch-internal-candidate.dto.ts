import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

@Exclude()
export class PatchInternalCandidateDto {
  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsString()
  uid?: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsString()
  openingId?: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsString()
  stageId?: string;
}
