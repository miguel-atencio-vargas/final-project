import { Module } from '@nestjs/common';
import { StageService } from './stage.service';
import { StageController } from './stage.controller';
import { Stage, StageSchema } from './schemas/stage.schema';
import { Company, CompanySchema } from 'src/company/schemas/company.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Stage.name, schema: StageSchema },
      { name: Company.name, schema: CompanySchema },
    ]),
  ],
  providers: [StageService],
  controllers: [StageController],
})
export class StageModule {}
