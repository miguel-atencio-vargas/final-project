import { Module } from '@nestjs/common';
import { CompanyService } from '../company/services/company.service';
import { CompanyController } from '../company/controllers/company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './schemas/company.schema';
import { OpeningService } from '../company/services/opening.service';
import { OpeningController } from '../company/controllers/opening.controller';
import { Opening, OpeningSchema } from './schemas/opening.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: Opening.name, schema: OpeningSchema },
    ]),
  ],
  providers: [CompanyService, OpeningService],
  controllers: [CompanyController, OpeningController],
})
export class CompanyModule {}
