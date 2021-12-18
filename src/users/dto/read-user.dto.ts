import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString, IsEmail } from 'class-validator';

@Exclude()
export class ReadUserDto {
  @ApiProperty()
  @Expose()
  readonly _id: string;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @Expose()
  @IsEmail()
  readonly email: string;
}
