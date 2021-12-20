import {
  Controller,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CandidateOpeningService } from '../services/candidate-opening.service';

@ApiTags('candidate opening')
@Controller('candidates')
export class CandidateOpeningController {
  constructor(
    private readonly candidateOpeningService: CandidateOpeningService,
  ) {}

  @ApiOperation({ summary: 'Candidate applying for an opening' })
  @ApiResponse({
    status: 200,
    description: 'Candidate registered to an opening sussesfully',
  })
  @ApiParam({
    name: 'candidateId',
    description: 'id for a registered candidate',
  })
  @ApiParam({
    name: 'openingId',
    description: 'id for a registered opening per Company',
  })
  @UseGuards(JwtAuthGuard)
  @Post(':candidateId/openings/:openingId')
  applyToAnOpening(
    @Param('candidateId') candidateId: string,
    @Param('openingId') openingId: string,
    @Req() { user },
  ) {
    if (user._id !== candidateId) {
      throw new UnauthorizedException('');
    }
    return this.candidateOpeningService.applyTo(candidateId, openingId);
  }
}
