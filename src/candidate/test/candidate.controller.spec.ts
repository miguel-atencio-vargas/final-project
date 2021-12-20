import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesController } from '../controllers/candidate.controller';
import { ReadCandidateDto } from '../dto/read-candidate.dto';
import { CandidateService } from '../services/candidate.service';

describe('CandidateController', () => {
  let candidateController: CandidatesController;
  let candidateService: CandidateService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidatesController],
      providers: [
        {
          provide: CandidateService,
          useValue: {
            findOne: jest.fn(),
            getAll: jest.fn(),
          },
        },
      ],
    }).compile();

    candidateController =
      module.get<CandidatesController>(CandidatesController);
    candidateService = module.get<CandidateService>(CandidateService);
  });

  it('should be defined', () => {
    expect(candidateController).toBeDefined();
  });

  describe('getCandidateById()', () => {
    const candidateId = '123';
    it('should call to findOne', () => {
      jest
        .spyOn(candidateService, 'findOne')
        .mockResolvedValue(new ReadCandidateDto());
      expect(
        candidateController.getCandidateById(candidateId),
      ).resolves.toBeInstanceOf(ReadCandidateDto);
      expect(candidateService.findOne).toBeCalledWith(candidateId);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(candidateService, 'findOne').mockImplementation(async () => {
        throw new NotFoundException();
      });
      expect(
        candidateController.getCandidateById(candidateId + '1'),
      ).rejects.toThrow(new NotFoundException());
    });
  });

  describe('getCandidates()', () => {
    it('should retrieve all candidates', () => {
      jest
        .spyOn(candidateService, 'getAll')
        .mockResolvedValue([new ReadCandidateDto()]);
      expect(candidateController.getCandidates()).resolves.toHaveLength(1);
      expect(candidateService.getAll).toBeCalled();
    });
  });
});
