import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { StageService } from '../../company/services/stage.service';
import { ReadCandidateDto } from '../dto/read-candidate.dto';
import { CandidateState } from '../enum/candidate-state.enum';
import { Candidate, CandidateDocument } from '../schemas/candidate.schema';

@Injectable()
export class CompanyCandidateService {
  constructor(
    @InjectModel(Candidate.name)
    private candidateModel: Model<CandidateDocument>,
    private readonly stageService: StageService,
  ) {}

  async acceptCandidateToStartRecruitment(
    candidateId: string,
    companyId: string,
  ): Promise<ReadCandidateDto> {
    const candidate: any = await this.candidateModel
      .findById(candidateId)
      .populate('openingId');
    if (candidate.openingId.companyId !== companyId) {
      throw new NotFoundException(
        'This candidate has not applied to any opening of this company',
      );
    }
    if (candidate.stageId !== CandidateState.AWAITING) {
      throw new UnprocessableEntityException(
        candidate.stageId === CandidateState.ACCEPTED
          ? `This candidate was accepted for the opening`
          : candidate.stageId === CandidateState.REJECTED
          ? 'This candidate was rejected for this opening'
          : `This candidate is on stage ${candidate.stageId}`,
      );
    }
    const firstStage = await this.stageService.getFirstStageScopedByCompany(
      companyId,
    );
    if (!firstStage) {
      throw new NotFoundException('This opening does not have stages');
    }
    const candidateUpdated = await this.candidateModel.findByIdAndUpdate(
      candidateId,
      { stageId: firstStage._id },
      { new: true },
    );

    return plainToClass(ReadCandidateDto, candidateUpdated);
  }
}
