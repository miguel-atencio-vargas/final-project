import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

@Exclude()
export class PatchCandidateDto {
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

  @Expose()
  @IsOptional()
  @ApiProperty()
  @IsString()
  uid?: string;
}
