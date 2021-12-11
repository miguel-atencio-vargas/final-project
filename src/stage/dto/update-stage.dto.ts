import { IsString, IsEmail } from 'class-validator';

export class PutStageDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEmail()
  companyId: string;
}
