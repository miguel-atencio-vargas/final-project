import { IsArray, IsEmail, IsString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  _id: string;
  @IsEmail()
  recruiterEmail: string;
  @IsString()
  companyId: string;
  @IsString()
  company: string;
  @IsArray()
  stages: any;
  @IsArray()
  openings: any;
}
