import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { StageService } from '../../company/services/stage.service';
import { ConfigMailDto, ContextMailDto } from '../../mail/dto/send-mail.dto';
import { TemplateEmail } from '../../mail/enum/type-mail.enum';
import { MailService } from '../../mail/mail.service';
import { ReadCandidateDto } from '../dto/read-candidate.dto';
import { CandidateState } from '../enum/candidate-state.enum';
import { Candidate, CandidateDocument } from '../schemas/candidate.schema';

@Injectable()
export class CompanyCandidateService {
  constructor(
    @InjectModel(Candidate.name)
    private candidateModel: Model<CandidateDocument>,
    private readonly stageService: StageService,
    private readonly mailService: MailService,
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

  async notifyStatus(candidateId: string) {
    const candidate: any = await this.candidateModel
      .findById(candidateId)
      .select('email firstName lastName stageId')
      .populate({ path: 'openingId', populate: { path: 'companyId' } });
    const isCandidateOnWorkflow = !Object.values(CandidateState).includes(
      candidate.stageId,
    );
    if (isCandidateOnWorkflow) {
      await candidate.populate('stageId', 'title previusStage');
    }
    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }
    if (!candidate.openingId) {
      throw new NotFoundException(
        'This candidate has not be applied to any opening',
      );
    }
    if (candidate.stageId === CandidateState.AWAITING) {
      throw new UnprocessableEntityException(
        'This candidate is waiting to be accepted on the process recruitment',
      );
    }
    const opening = candidate.openingId.name;
    const company = candidate.openingId.companyId.name;
    const stage = candidate.stageId;
    const subject =
      stage === CandidateState.ACCEPTED
        ? `${company} | You're been accepted for ${opening} opening!`
        : stage === CandidateState.REJECTED
        ? `${company} | Update about your appliement to ${opening} opening`
        : !stage?.previusStage
        ? `${company} | You're about to start on ${opening} opening!`
        : `${company} | Your next step on ${opening} is ${stage.title}`;
    const template =
      stage === CandidateState.ACCEPTED
        ? TemplateEmail.APPROVED
        : stage === CandidateState.REJECTED
        ? TemplateEmail.REJECTED
        : !stage?.previusStage
        ? TemplateEmail.ACCEPTED
        : TemplateEmail.NEW_STAGE;
    const configMailDto = new ConfigMailDto(candidate.email, subject, template);
    const contextMailDto = new ContextMailDto(
      `${candidate.firstName} ${candidate.lastName}`,
      opening,
    );
    try {
      await this.mailService.sendConfirmationEmail(
        configMailDto,
        contextMailDto,
      );
    } catch (error) {
      console.log('CompanyCandidateService', error.message);
    }
    candidate.depopulate('stageId openingId');
    return plainToClass(ReadCandidateDto, candidate);
  }

  async levelUpCandidate(candidateId: string) {
    const candidate: any = await this.candidateModel.findById(candidateId);
    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }
    const isCandidateOnWorkflow = !Object.values(CandidateState).includes(
      candidate.stageId,
    );
    if (!isCandidateOnWorkflow) {
      throw new UnprocessableEntityException(
        'This candidate is not on a recruitment workflow',
      );
    }
    await candidate.populate('stageId');
    const stage = candidate.stageId;
    return this.candidateModel.findByIdAndUpdate(
      candidateId,
      {
        stageId:
          stage.nextStage === null ? CandidateState.ACCEPTED : stage.nextStage,
      },
      { new: true },
    );
  }
}
