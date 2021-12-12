import { IsString } from 'class-validator';

export class CreateStageDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
