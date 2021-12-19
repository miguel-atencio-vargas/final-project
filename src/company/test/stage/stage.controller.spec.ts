import { Test, TestingModule } from '@nestjs/testing';
import { StageController } from '../../controllers/stage/stage.controller';
import { StageService } from '../../services/stage.service';

describe('StageController', () => {
  let stageController: StageController;
  let stageService: StageService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StageController],
      providers: [{ provide: StageService, useValue: {} }],
    }).compile();

    stageController = module.get<StageController>(StageController);
    stageService = module.get<StageService>(StageService);
  });

  it('should be defined', () => {
    expect(stageController).toBeDefined();
  });
});
