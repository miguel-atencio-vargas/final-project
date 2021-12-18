import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidateModule } from '../candidate/candidate.module';
import { CompanyModule } from '../company/company.module';
import { CompanyReportController } from './report.controller';
import { ReportService } from './report.service';
import { Report, ReportSchema } from './schema/report.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Report.name,
        schema: ReportSchema,
      },
    ]),
    CompanyModule,
    CandidateModule,
  ],
  providers: [ReportService],
  controllers: [CompanyReportController],
})
export class ReportModule {}
