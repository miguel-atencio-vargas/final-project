import { Test, TestingModule } from '@nestjs/testing';
import { ReadOpeningDto } from '../../company/dto/opening/read-opening.dto';
import { OpeningService } from '../../company/services/opening.service';
import { CompanyCandidateController } from '../controllers/company-candidate.controller';
import { CreateCandidateDto } from '../dto/create-candidate.dto';
import { PatchCandidateDto } from '../dto/patch-candidate.dto';
import { PutCandidateDto } from '../dto/put-candidate.dto';
import { ReadCandidateDto } from '../dto/read-candidate.dto';
import { CandidateState } from '../enum/candidate-state.enum';
import { CandidateService } from '../services/candidate.service';
import { CompanyCandidateService } from '../services/company-candidate.service';

describe('CandidateController', () => {
  let companyCandidateController: CompanyCandidateController;
  let candidateService: CandidateService;
  let companyCandidateService: CompanyCandidateService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyCandidateController],
      providers: [
        {
          provide: CandidateService,
          useValue: {
            findOne: jest.fn(),
            getAll: jest.fn(),
            create: jest.fn().mockResolvedValue(new ReadCandidateDto()),
            findOneScopedByCompany: jest
              .fn()
              .mockResolvedValue(new ReadCandidateDto()),
            getAllScopedByCompany: jest
              .fn()
              .mockResolvedValue([new ReadCandidateDto()]),
            updateOne: jest.fn(),
            patchOne: jest.fn(),
            removeOne: jest.fn(),
          },
        },
        {
          provide: CompanyCandidateService,
          useValue: {
            acceptCandidateToStartRecruitment: jest.fn(),
            notifyStatus: jest.fn(),
            levelUpCandidate: jest.fn(),
            rejectCandidate: jest.fn(),
            getStatus: jest.fn(),
          },
        },
        {
          provide: OpeningService,
          useValue: {
            findOneOnACompany: jest
              .fn()
              .mockResolvedValue(new ReadOpeningDto()),
          },
        },
      ],
    }).compile();
    companyCandidateController = module.get<CompanyCandidateController>(
      CompanyCandidateController,
    );
    candidateService = module.get<CandidateService>(CandidateService);
    companyCandidateService = module.get<CompanyCandidateService>(
      CompanyCandidateService,
    );
  });

  it('should be defined', () => {
    expect(companyCandidateController).toBeDefined();
  });

  describe('newCandidate()', () => {
    const companyId = '123';
    const createCandidate: CreateCandidateDto = {
      firstName: 'candidate',
      lastName: 'lastName',
      email: 'candidate@gmail.com',
      openingId: '122',
    };
    it('should create a new candidate applied to an opening', () => {
      expect(
        companyCandidateController.newCandidate(createCandidate, companyId),
      ).resolves.toBeInstanceOf(ReadCandidateDto);
    });
  });

  describe('getCandidateByIdScopedByCompany()', () => {
    const candidateId = '123';
    const companyId = '321';
    it('should retrieve one candidate scoped', () => {
      expect(
        companyCandidateController.getCandidateByIdScopedByCompany(
          candidateId,
          companyId,
        ),
      ).resolves.toBeInstanceOf(ReadCandidateDto);
      expect(candidateService.findOneScopedByCompany).toBeCalledWith(
        companyId,
        candidateId,
      );
    });
  });

  describe('getCandidateByIdScopedByCompany()', () => {
    const candidateId = '123';
    const companyId = '321';
    it('should retrieve one candidate scoped', () => {
      expect(
        companyCandidateController.getCandidateByIdScopedByCompany(
          candidateId,
          companyId,
        ),
      ).resolves.toBeInstanceOf(ReadCandidateDto);
      expect(candidateService.findOneScopedByCompany).toBeCalledWith(
        companyId,
        candidateId,
      );
    });
  });

  describe('getCandidatesScopedByCompany()', () => {
    const companyId = '321';
    it('should retrieve all candidates scoped', () => {
      expect(
        companyCandidateController.getCandidatesScopedByCompany(companyId),
      ).resolves.toHaveLength(1);
      expect(candidateService.getAllScopedByCompany).toBeCalledWith(companyId);
    });
  });

  describe('putCandidate()', () => {
    const candidateId = '123';
    const companyId = '321';
    const putCandidate: PutCandidateDto = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'candidate@gmail.com',
      uid: '123',
    };
    it('should update a candidate', () => {
      jest
        .spyOn(candidateService, 'updateOne')
        .mockResolvedValue(new ReadCandidateDto());
      expect(
        companyCandidateController.putCandidate(
          candidateId,
          companyId,
          putCandidate,
        ),
      ).resolves.toBeInstanceOf(ReadCandidateDto);
    });
  });

  describe('patchCandidate()', () => {
    const candidateId = '123';
    const companyId = '321';
    const patchCandidate: PatchCandidateDto = {
      firstName: 'firstName',
    };
    it('should patch a candidate', () => {
      jest
        .spyOn(candidateService, 'patchOne')
        .mockResolvedValue(new ReadCandidateDto());
      expect(
        companyCandidateController.patchCandidate(
          candidateId,
          companyId,
          patchCandidate,
        ),
      ).resolves.toBeInstanceOf(ReadCandidateDto);
    });
  });

  describe('removeCandidate()', () => {
    const candidateId = '123';
    const companyId = '321';
    it('should remove a candidate', () => {
      jest.spyOn(candidateService, 'removeOne').mockImplementation(async () => {
        return;
      });
      expect(companyCandidateController.removeCandidate(candidateId, companyId))
        .resolves;
    });
  });

  describe('acceptCandidateToStartProcess()', () => {
    const candidateId = '123';
    const companyId = '321';
    it('should accept a candidate to start process', () => {
      jest
        .spyOn(companyCandidateService, 'acceptCandidateToStartRecruitment')
        .mockResolvedValue(new ReadCandidateDto());
      expect(
        companyCandidateController.acceptCandidateToStartProcess(
          companyId,
          candidateId,
        ),
      ).resolves.toBeInstanceOf(ReadCandidateDto);
      expect(
        companyCandidateService.acceptCandidateToStartRecruitment,
      ).toBeCalledWith(candidateId, companyId);
    });
  });

  describe('notifyTheStatusOfCandidateProcess()', () => {
    const candidateId = '123';
    it('should notify the status to a candidate ', () => {
      jest
        .spyOn(companyCandidateService, 'notifyStatus')
        .mockResolvedValue(new ReadCandidateDto());
      expect(
        companyCandidateController.notifyTheStatusOfCandidateProcess(
          candidateId,
        ),
      ).resolves.toBeInstanceOf(ReadCandidateDto);
      expect(companyCandidateService.notifyStatus).toBeCalledWith(candidateId);
    });
  });

  describe('levelUpStageOfCandidate()', () => {
    const candidateId = '123';
    it('should level up the status to a candidate ', () => {
      jest
        .spyOn(companyCandidateService, 'levelUpCandidate')
        .mockResolvedValue(new ReadCandidateDto());
      expect(
        companyCandidateController.levelUpStageOfCandidate(candidateId),
      ).resolves.toBeInstanceOf(ReadCandidateDto);
      expect(companyCandidateService.levelUpCandidate).toBeCalledWith(
        candidateId,
      );
    });
  });

  describe('rejectCandidate()', () => {
    const candidateId = '123';
    it('should reject the appliement of a candidate ', () => {
      jest
        .spyOn(companyCandidateService, 'rejectCandidate')
        .mockResolvedValue(new ReadCandidateDto());
      expect(
        companyCandidateController.rejectCandidate(candidateId),
      ).resolves.toBeInstanceOf(ReadCandidateDto);
      expect(companyCandidateService.rejectCandidate).toBeCalledWith(
        candidateId,
      );
    });
  });

  describe('getCandidateStatus()', () => {
    const candidateId = '123';
    const companyId = '321';
    const status = {
      candidate: `Candidate Name`,
      candidateEmail: 'candidate@gmail.com',
      status: `Candidate has been ${CandidateState.ACCEPTED}`,
      opening: 'Backend developer',
      company: 'Company name',
    };
    it('should retrieve the status of a candidate ', () => {
      jest
        .spyOn(companyCandidateService, 'getStatus')
        .mockResolvedValue(status);
      expect(
        companyCandidateController.getCandidateStatus(companyId, candidateId),
      ).resolves.toBe(status);
      expect(companyCandidateService.getStatus).toBeCalledWith(
        companyId,
        candidateId,
      );
    });
  });
});
