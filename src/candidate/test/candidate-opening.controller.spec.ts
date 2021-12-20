import { Test, TestingModule } from '@nestjs/testing';
import { CandidateOpeningController } from '../controllers/candidate-opening.controllers';
import { ReadCandidateDto } from '../dto/read-candidate.dto';
import { CandidateOpeningService } from '../services/candidate-opening.service';

describe('CandidateOpeningController', () => {
  let candidateOpeningController: CandidateOpeningController;
  let candidateOpeningService: CandidateOpeningService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidateOpeningController],
      providers: [
        {
          provide: CandidateOpeningService,
          useValue: {
            applyTo: jest.fn().mockResolvedValue(new ReadCandidateDto()),
          },
        },
      ],
    }).compile();

    candidateOpeningController = module.get<CandidateOpeningController>(
      CandidateOpeningController,
    );
    candidateOpeningService = module.get<CandidateOpeningService>(
      CandidateOpeningService,
    );
  });

  it('should be defined', () => {
    expect(candidateOpeningController).toBeDefined();
  });

  describe('applyToAnOpening()', () => {
    const candidateId = '123';
    const openingId = '3211';
    it('should call to candidateOpeningService', () => {
      expect(
        candidateOpeningController.applyToAnOpening(candidateId, openingId, {
          user: { _id: candidateId },
        }),
      ).resolves.toBeInstanceOf(ReadCandidateDto);
      expect(candidateOpeningService.applyTo).toHaveBeenCalledWith(
        candidateId,
        openingId,
      );
    });
  });
});
