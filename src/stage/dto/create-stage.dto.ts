import { IsString, IsEmail } from 'class-validator';

export class CreateStageDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEmail()
  companyId: string;
}
