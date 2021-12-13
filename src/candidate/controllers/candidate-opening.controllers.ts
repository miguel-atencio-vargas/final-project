import { Controller, Param, Post } from '@nestjs/common';
import { CandidateService } from '../services/candidate.service';

@Controller('openings')
export class CandidateOpeningController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post(':openingId/candidates/:candidateId')
  applyToAnOpenning(
    @Param('candidateId') candidateId: string,
    @Param('openingId') openingId: string,
  ) {
    return '';
  }
}
