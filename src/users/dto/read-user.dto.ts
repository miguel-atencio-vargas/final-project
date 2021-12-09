import { Exclude, Expose } from 'class-transformer';
import { IsString, IsEmail } from 'class-validator';

@Exclude()
export class ReadUserDto {
  @Expose()
  readonly _id: string;

  @Expose()
  @IsString()
  readonly firstName: string;

  @Expose()
  @IsString()
  readonly lastName: string;

  @Expose()
  @IsEmail()
  readonly email: string;
}
