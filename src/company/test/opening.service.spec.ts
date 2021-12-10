import { Test, TestingModule } from '@nestjs/testing';
import { OpeningService } from './opening.service';

describe('OpeningService', () => {
  let service: OpeningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpeningService],
    }).compile();

    service = module.get<OpeningService>(OpeningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
