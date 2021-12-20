import { Test, TestingModule } from '@nestjs/testing';
import { CompanyStageController } from '../../controllers/stage/company-stage.controllers';
import { ReadStageDto } from '../../dto/stage/read-stage.dto';
import { PutStageDto } from '../../dto/stage/update-stage.dto';
import { StageService } from '../../services/stage.service';

describe('CompanyStageController', () => {
  let companyStageController: CompanyStageController;
  let stageService: StageService;
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CompanyStageController],
      providers: [
        {
          provide: StageService,
          useValue: {
            findOneOnACompany: jest.fn().mockResolvedValue(new ReadStageDto()),
            getAllByCompany: jest.fn().mockResolvedValue([new ReadStageDto()]),
            updateOne: jest.fn().mockResolvedValue(new ReadStageDto()),
            removeOne: jest.fn(),
          },
        },
      ],
    }).compile();

    companyStageController = moduleRef.get<CompanyStageController>(
      CompanyStageController,
    );
    stageService = moduleRef.get<StageService>(StageService);
  });

  it('should be defined', () => {
    expect(companyStageController).toBeDefined();
  });

  describe('getStageByIdOnCompany()', () => {
    const companyId = '123';
    const stageId = '321';
    it('should return all stages scoped', () => {
      expect(
        companyStageController.getStageByIdOnCompany(companyId, stageId),
      ).resolves.toBeInstanceOf(ReadStageDto);
      expect(stageService.findOneOnACompany).toBeCalledTimes(1);
    });
  });

  describe('getStagesScopedByCompany()', () => {
    const companyId = '123';
    it('should stages of a company', () => {
      expect(
        companyStageController.getStagesScopedByCompany(companyId),
      ).resolves.toHaveLength(1);
      expect(stageService.getAllByCompany).toBeCalledWith(companyId);
    });
  });

  describe('updateStage()', () => {
    const stageId = '123';
    const companyId = '432';
    const data: PutStageDto = {
      title: 'stage',
      description: 'stage desc',
      companyId: '123',
    };
    it('should update a stage of a company', () => {
      expect(
        companyStageController.updateStage(stageId, companyId, data),
      ).resolves.toBeInstanceOf(ReadStageDto);
    });
  });

  describe('removeStage()', () => {
    const stageId = '123';
    const companyId = '432';
    it('should remove a stage of a company', () => {
      expect(companyStageController.removeStage(stageId, companyId)).resolves
        .toBeUndefined;
    });
  });
});
