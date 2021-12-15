import { Module } from '@nestjs/common';
import { CompanyService } from '../company/services/company.service';
import { CompanyController } from '../company/controllers/company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './schemas/company.schema';
import { OpeningService } from '../company/services/opening.service';
import { CompanyOpeningController } from './controllers/opening/company-opening.controller';
import { Opening, OpeningSchema } from './schemas/opening.schema';
import { Stage, StageSchema } from './schemas/stage.schema';
import { StageService } from './services/stage.service';
import { StageController } from './controllers/stage/stage.controller';
import { OpeningController } from './controllers/opening/opening.controller';
import { CompanyStageController } from './controllers/stage/company-stage.controllers';

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
    CompanyOpeningController,
    StageController,
    CompanyStageController,
  ],
  exports: [OpeningService, StageService],
})
export class CompanyModule {}
