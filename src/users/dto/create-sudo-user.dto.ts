import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString, IsEmail } from 'class-validator';

@Exclude()
export class CreateSudoUserDto {
  @ApiProperty()
  @Expose()
  @IsString()
  firstName: string;

  @ApiProperty()
  @Expose()
  @IsString()
  lastName: string;

  @ApiProperty()
  @Expose()
  @IsEmail()
  email: string;
}
