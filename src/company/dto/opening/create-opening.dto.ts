import { IsString } from 'class-validator';

export class CreateOpeningDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  companyId: string;
}
