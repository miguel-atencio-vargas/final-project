import { IsString } from 'class-validator';

export class PutUserDto {
  @IsString()
  name: string;
}
