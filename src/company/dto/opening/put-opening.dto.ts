import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PutOpeningDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  companyId: string;
}
