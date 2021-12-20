import { Test, TestingModule } from '@nestjs/testing';
import { StageController } from '../../controllers/stage/stage.controller';
import { ReadStageDto } from '../../dto/stage/read-stage.dto';
import { StageService } from '../../services/stage.service';

describe('StageController', () => {
  let stageController: StageController;
  let stageService: StageService;
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [StageController],
      providers: [
        {
          provide: StageService,
          useValue: { getAll: jest.fn(), findOne: jest.fn() },
        },
      ],
    }).compile();

    stageController = moduleRef.get<StageController>(StageController);
    stageService = moduleRef.get<StageService>(StageService);
  });

  it('should be defined', () => {
    expect(stageController).toBeDefined();
  });

  describe('getStages()', () => {
    it('should return all stages', () => {
      jest
        .spyOn(stageService, 'getAll')
        .mockResolvedValue([new ReadStageDto()]);
      expect(stageController.getStages()).resolves.toHaveLength(1);
      expect(stageService.getAll).toBeCalledTimes(1);
    });
  });

  describe('getStageById()', () => {
    const stageId = '123';
    it('should return one stage', () => {
      jest.spyOn(stageService, 'findOne').mockResolvedValue(new ReadStageDto());
      expect(stageController.getStageById(stageId)).resolves.toBeInstanceOf(
        ReadStageDto,
      );
      expect(stageService.findOne).toBeCalledWith(stageId);
    });
  });
});
