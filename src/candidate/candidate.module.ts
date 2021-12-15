import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyCandidateController } from './controllers/company-candidate.controller';
import { CandidateService } from './services/candidate.service';
import { Candidate, CandidateSchema } from './schemas/candidate.schema';
import { CandidateOpeningController } from './controllers/candidate-opening.controllers';
import { CandidateOpeningService } from './services/candidate-opening.service';
import { CompanyModule } from '../company/company.module';
import { CandidatesController } from './controllers/candidate.controller';
import { CompanyCandidateService } from './services/company-candidate.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    CompanyModule,
    MailModule,
    MongooseModule.forFeature([
      {
        name: Candidate.name,
        schema: CandidateSchema,
      },
    ]),
  ],
  controllers: [
    CompanyCandidateController,
    CandidateOpeningController,
    CandidatesController,
  ],
  providers: [
    CandidateService,
    CandidateOpeningService,
    CompanyCandidateService,
  ],
  exports: [CandidateService],
})
export class CandidateModule {}
