import { IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadJtiDto {
  @Expose()
  @IsNumber()
  readonly _id: number;
}
