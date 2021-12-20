import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString, IsEmail } from 'class-validator';

@Exclude()
export class PutCandidateDto {
  @Expose()
  @ApiProperty()
  @IsString()
  firstName: string;

  @Expose()
  @ApiProperty()
  @IsString()
  lastName: string;

  @Expose()
  @ApiProperty()
  @IsEmail()
  email: string;

  @Expose()
  @ApiProperty()
  @IsString()
  uid: string;
}
