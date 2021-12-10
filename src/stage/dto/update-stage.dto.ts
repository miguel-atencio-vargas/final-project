import { IsString, IsEmail } from 'class-validator';

export class UpdateStageDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEmail()
  companyId: string;
}
