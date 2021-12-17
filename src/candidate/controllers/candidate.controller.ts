import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Roles } from '../../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { RoleUser } from '../../users/enum/roles.enums';
import { CandidateService } from '../services/candidate.service';

@ApiTags('candidates - sudo admin')
@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidateService: CandidateService) {}

  @ApiOperation({ summary: 'Returns a candidate with an Id provided' })
  @ApiResponse({
    status: 200,
    description: 'Candidated found',
  })
  @ApiParam({
    name: 'candidateId',
    description: 'id for a registered candidate',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get(':candidateId')
  getCandidateById(@Param('candidateId') candidateId: string) {
    return this.candidateService.findOne(candidateId);
  }

  @ApiOperation({ summary: 'Returns all candidates' })
  @ApiResponse({
    status: 200,
    description: 'Get all candidates',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get()
  getCandidates() {
    return this.candidateService.getAll();
  }
}
