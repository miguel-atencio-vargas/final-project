import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class ReadOpeningDto {
  @Expose()
  readonly _id: string;

  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsString()
  companyId: string;
}