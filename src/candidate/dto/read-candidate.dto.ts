import { Exclude, Expose } from 'class-transformer';
import { IsString, IsEmail } from 'class-validator';

@Exclude()
export class ReadCandidateDto {
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

  @Expose()
  @IsString()
  readonly uid: string;

  @Expose()
  @IsString()
  readonly openingId: string;

  @Expose()
  @IsString()
  readonly stageId: string;
}
