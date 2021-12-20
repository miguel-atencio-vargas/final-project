import { Test, TestingModule } from '@nestjs/testing';
import { OpeningController } from '../../controllers/opening/opening.controller';
import { ReadOpeningDto } from '../../dto/opening/read-opening.dto';
import { OpeningService } from '../../services/opening.service';

describe('OpeningController', () => {
  let openingController: OpeningController;
  let openingService: OpeningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpeningController],
      providers: [
        {
          provide: OpeningService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([new ReadOpeningDto()]),
            findOne: jest.fn().mockResolvedValue(new ReadOpeningDto()),
          },
        },
      ],
    }).compile();

    openingController = module.get<OpeningController>(OpeningController);
    openingService = module.get<OpeningService>(OpeningService);
  });

  it('should be defined', () => {
    expect(openingController).toBeDefined();
  });

  describe('getOpenings()', () => {
    it('should retrieve all openings', () => {
      expect(openingController.getOpenings()).resolves.toHaveLength(1);
      expect(openingService.getAll).toBeCalledTimes(1);
    });
  });

  describe('getOpeningById()', () => {
    const openingId = '123';
    it('should retrieve one opening', () => {
      expect(
        openingController.getOpeningById(openingId),
      ).resolves.toBeInstanceOf(ReadOpeningDto);
      expect(openingService.findOne).toBeCalledWith(openingId);
    });
  });
});
