import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class ReadCompanyDto {
  @ApiProperty()
  @Expose()
  readonly _id: string;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly name: string;
}
