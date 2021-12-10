import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class ReadCompanyDto {
  @Expose()
  readonly _id: string;

  @Expose()
  @IsString()
  readonly name: string;
}
