import { Test, TestingModule } from '@nestjs/testing';
import { OpeningController } from './opening.controller';

describe('OpeningController', () => {
  let controller: OpeningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpeningController],
    }).compile();

    controller = module.get<OpeningController>(OpeningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
