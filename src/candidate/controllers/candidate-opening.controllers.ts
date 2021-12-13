import { Controller, Param, Post } from '@nestjs/common';
import { CandidateOpeningService } from '../services/candidate-opening.service';

@Controller('candidates')
export class CandidateOpeningController {
  constructor(
    private readonly candidateOpeningService: CandidateOpeningService,
  ) {}

  @Post(':candidateId/openings/:openingId')
  applyToAnOpening(
    @Param('candidateId') candidateId: string,
    @Param('openingId') openingId: string,
  ) {
    return this.candidateOpeningService.applyTo(candidateId, openingId);
  }
}
