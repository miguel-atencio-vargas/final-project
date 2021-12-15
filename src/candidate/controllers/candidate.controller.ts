import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Roles } from '../../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { RoleUser } from '../../users/enum/roles.enums';
import { CandidateService } from '../services/candidate.service';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidateService: CandidateService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get(':candidateId')
  getCandidateById(@Param('candidateId') candidateId: string) {
    return this.candidateService.findOne(candidateId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get()
  getCandidates() {
    return this.candidateService.getAll();
  }
}
