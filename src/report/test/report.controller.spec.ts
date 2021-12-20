import { getModelToken } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { CandidateService } from '../../candidate/services/candidate.service';
import { CompanyService } from '../../company/services/company.service';
import { OpeningService } from '../../company/services/opening.service';
import { StageService } from '../../company/services/stage.service';
import { CompanyReportController } from '../report.controller';
import { ReportService } from '../report.service';
import { Report } from '../schema/report.schema';

describe('CompanyReportController', () => {
  let companyReportController: CompanyReportController;
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CompanyReportController],
      providers: [
        ReportService,
        {
          provide: getModelToken(Report.name),
          useValue: { createOne: jest.fn() },
        },
        { provide: OpeningService, useValue: {} },
        { provide: CandidateService, useValue: {} },
        { provide: StageService, useValue: {} },
        { provide: CompanyService, useValue: {} },
      ],
    }).compile();
    companyReportController = moduleRef.get<CompanyReportController>(
      CompanyReportController,
    );

    companyReportController = moduleRef.get<CompanyReportController>(
      CompanyReportController,
    );
  });

  it('should be defined', () => {
    expect(companyReportController).toBeDefined();
  });
});
