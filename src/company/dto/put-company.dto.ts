import { IsString } from 'class-validator';

export class PutCompanyDto {
  @IsString()
  name: string;
}
