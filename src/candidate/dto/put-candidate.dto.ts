import { IsString, IsEmail } from 'class-validator';

export class PutCandidateDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  uid: string;

  @IsString()
  openingId: string;

  @IsString()
  stageId: string;
}
