import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PutCompanyDto {
  @ApiProperty()
  @IsString()
  name: string;
}
