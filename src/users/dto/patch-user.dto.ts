import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsEmail, IsNumber } from 'class-validator';

export class PatchUserDto {
  @Expose()
  @IsOptional()
  @IsString()
  firstName: string;

  @Expose()
  @IsOptional()
  @IsString()
  lastName: string;

  @Expose()
  @IsOptional()
  @IsEmail()
  email: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  role: number;

  @Expose()
  @IsOptional()
  // TODO: change to @IsMongoId
  @IsNumber()
  companyId: number;
}
