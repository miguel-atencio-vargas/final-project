import { IsString } from 'class-validator';

export class PutOpeningDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
}
