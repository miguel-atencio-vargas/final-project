import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Opening } from '../schemas/opening.schema';
import { OpeningService } from '../services/opening.service';

describe('OpeningService', () => {
  let openingService: OpeningService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        OpeningService,
        {
          provide: getModelToken(Opening.name),
          useValue: {},
        },
      ],
    }).compile();

    openingService = moduleRef.get<OpeningService>(OpeningService);
  });

  it('should be defined', () => {
    expect(openingService).toBeDefined();
  });
});
