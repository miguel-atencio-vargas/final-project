import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidateController } from './controllers/candidate.controller';
import { CandidateService } from './services/candidate.service';
import { Candidate, CandidateSchema } from './schemas/candidate.schema';
import { CandidateOpeningController } from './controllers/candidate-opening.controllers';
import { CandidateOpeningService } from './services/candidate-opening.service';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    CompanyModule,
    MongooseModule.forFeature([
      {
        name: Candidate.name,
        schema: CandidateSchema,
      },
    ]),
  ],
  controllers: [CandidateController, CandidateOpeningController],
  providers: [CandidateService, CandidateOpeningService],
  exports: [CandidateService],
})
export class CandidateModule {}
