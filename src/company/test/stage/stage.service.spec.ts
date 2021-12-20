import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Stage } from '../../schemas/stage.schema';
import { StageService } from '../../services/stage.service';

describe('StageService', () => {
  let service: StageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StageService,
        {
          provide: getModelToken(Stage.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<StageService>(StageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
