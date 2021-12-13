import { Module } from '@nestjs/common';
import { CompanyService } from '../company/services/company.service';
import { CompanyController } from '../company/controllers/company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './schemas/company.schema';
import { OpeningService } from '../company/services/opening.service';
import { OpeningController } from '../company/controllers/opening.controller';
import { Opening, OpeningSchema } from './schemas/opening.schema';
import { Stage, StageSchema } from './schemas/stage.schema';
import { StageService } from './services/stage.service';
import { StageController } from './controllers/stage.controller';
import { CompanyStageController } from './controllers/company-stage.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: Opening.name, schema: OpeningSchema },
      { name: Stage.name, schema: StageSchema },
    ]),
  ],
  providers: [CompanyService, OpeningService, StageService],
  controllers: [
    CompanyController,
    OpeningController,
    StageController,
    CompanyStageController,
  ],
  exports: [OpeningService],
})
export class CompanyModule {}
