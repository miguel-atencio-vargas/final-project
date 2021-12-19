import { Test, TestingModule } from '@nestjs/testing';
import { OpeningController } from '../controllers/opening/opening.controller';
import { OpeningService } from '../services/opening.service';

describe('OpeningController', () => {
  let controller: OpeningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpeningController],
      providers: [{ provide: OpeningService, useValue: {} }],
    }).compile();

    controller = module.get<OpeningController>(OpeningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
