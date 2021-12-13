import { BadRequestException, Injectable } from '@nestjs/common';
import { OpeningService } from '../../company/services/opening.service';
import { CandidateService } from './candidate.service';

@Injectable()
export class CandidateOpeningService {
  constructor(
    private readonly candidateService: CandidateService,
    private readonly openingService: OpeningService,
  ) {}

  async applyTo(candidateId: string, openingId: string) {
    const opening = await this.openingService.findOne(openingId);
    if (!opening) {
      throw new BadRequestException(`The opening ${openingId} not exist`);
    }
    const candidate = await this.candidateService.findOne(candidateId);
    if (candidate.openingId !== null) {
      throw new BadRequestException(
        'The candidate was already applied to a opening',
      );
    }
    // patch candidate
  }
}
