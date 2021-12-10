import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJwtDto {
  @IsNotEmpty()
  @IsString()
  jti: string;
}
