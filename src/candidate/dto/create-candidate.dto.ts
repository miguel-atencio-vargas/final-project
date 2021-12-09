import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCandidateDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  uid: string;

  @IsString()
  openingId: string;

  @IsString()
  stageId: string;
}
