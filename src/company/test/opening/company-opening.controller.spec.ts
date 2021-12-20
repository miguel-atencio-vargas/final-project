import { TestingModule, Test } from '@nestjs/testing';
import { CompanyOpeningController } from '../../controllers/opening/company-opening.controller';
import { CreateOpeningDto } from '../../dto/opening/create-opening.dto';
import { PutOpeningDto } from '../../dto/opening/put-opening.dto';
import { ReadOpeningDto } from '../../dto/opening/read-opening.dto';
import { OpeningService } from '../../services/opening.service';

describe('OpeningController', () => {
  let companyOpeningController: CompanyOpeningController;
  let openingService: OpeningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyOpeningController],
      providers: [
        {
          provide: OpeningService,
          useValue: {
            create: jest.fn().mockResolvedValue(new ReadOpeningDto()),
            getAllByCompany: jest
              .fn()
              .mockResolvedValue([new ReadOpeningDto()]),
            findOneOnACompany: jest
              .fn()
              .mockResolvedValue(new ReadOpeningDto()),
            updateOne: jest.fn().mockResolvedValue(new ReadOpeningDto()),
            removeOne: jest.fn(),
          },
        },
      ],
    }).compile();

    companyOpeningController = module.get<CompanyOpeningController>(
      CompanyOpeningController,
    );
    openingService = module.get<OpeningService>(OpeningService);
  });

  it('should be defined', () => {
    expect(companyOpeningController).toBeDefined();
  });

  describe('newOpening()', () => {
    const companyId = '123';
    const openingToCreate: CreateOpeningDto = {
      name: 'Opening',
      description: 'description',
    };
    it('should create a new opening on a company', () => {
      expect(
        companyOpeningController.newOpening(companyId, openingToCreate),
      ).resolves.toBeInstanceOf(ReadOpeningDto);
      expect(openingService.create).toBeCalled();
    });
  });

  describe('getOpeningsByCompany()', () => {
    const companyId = '123';
    it('should retrive all openings on a company', () => {
      expect(
        companyOpeningController.getOpeningsByCompany(companyId),
      ).resolves.toHaveLength(1);
      expect(openingService.getAllByCompany).toBeCalled();
    });
  });

  describe('getOpeningByIdScopedByCompany()', () => {
    const companyId = '123';
    const openingId = '321';
    it('should retrieve one opening on a company', () => {
      expect(
        companyOpeningController.getOpeningByIdScopedByCompany(
          openingId,
          companyId,
        ),
      ).resolves.toBeInstanceOf(ReadOpeningDto);
      expect(openingService.findOneOnACompany).toBeCalledWith(
        openingId,
        companyId,
      );
    });
  });

  describe('updateOpening()', () => {
    const companyId = '123';
    const openingId = '321';
    const openingToUpdate: PutOpeningDto = {
      name: 'Opening',
      description: 'description',
      companyId: '123',
    };
    it('should update a one opening on a company', () => {
      expect(
        companyOpeningController.updateOpening(
          openingId,
          companyId,
          openingToUpdate,
        ),
      ).resolves.toBeInstanceOf(ReadOpeningDto);
    });
  });

  describe('removeOpening()', () => {
    const companyId = '123';
    const openingId = '321';
    it('should remove one opening on a company', () => {
      expect(
        companyOpeningController.removeOpening(companyId, openingId),
      ).resolves.toBeUndefined();
    });
  });
});
