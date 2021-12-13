import { BadRequestException, Injectable } from '@nestjs/common';
import { OpeningService } from '../../company/services/opening.service';
import { PatchInternalCandidateDto } from '../dto/patch-internal-candidate.dto';
import { CandidateState } from '../enum/candidate-state.enum';
import { CandidateService } from './candidate.service';

@Injectable()
export class CandidateOpeningService {
  constructor(
    private readonly candidateService: CandidateService,
    private readonly openingService: OpeningService,
  ) {}

  async applyTo(candidateId: string, openingId: string) {
    const opening = await this.openingService.findOne(openingId);
    if (!opening) throw new BadRequestException(`Opening not found`);
    const candidate = await this.candidateService.findOne(candidateId);
    if (candidate.openingId !== null) {
      throw new BadRequestException(
        'The candidate was already applied to an opening',
      );
    }
    const dataToUpdate = new PatchInternalCandidateDto();
    dataToUpdate.openingId = opening._id;
    dataToUpdate.stageId = CandidateState.AWAITING;
    return this.candidateService.patchOne(candidateId, dataToUpdate);
  }
}
