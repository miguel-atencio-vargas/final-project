import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class ReadStageDto {
  @ApiProperty()
  @Expose()
  readonly _id: string;

  @ApiProperty()
  @Expose()
  @IsString()
  title: string;

  @ApiProperty()
  @Expose()
  @IsString()
  description: string;

  @ApiProperty()
  @Expose()
  @IsString()
  companyId: string;
}
