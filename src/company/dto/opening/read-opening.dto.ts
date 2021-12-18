import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class ReadOpeningDto {
  @ApiProperty()
  @Expose()
  readonly _id: string;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @Expose()
  @IsString()
  description: string;

  @ApiProperty()
  @Expose()
  @IsString()
  companyId: string;
}
