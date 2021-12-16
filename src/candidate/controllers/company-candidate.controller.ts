import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CandidateService } from '../services/candidate.service';
import { CreateCandidateDto } from '../dto/create-candidate.dto';
import { PutCandidateDto } from '../dto/put-candidate.dto';
import { PatchCandidateDto } from '../dto/patch-candidate.dto';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RoleUser } from '../../users/enum/roles.enums';
import { CompanyCandidateService } from '../services/company-candidate.service';

@Controller('companies')
export class CompanyCandidateController {
  constructor(
    private readonly candidateService: CandidateService,
    private readonly companyCandidateService: CompanyCandidateService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    RoleUser.SUDO_ADMIN,
    RoleUser.COMPANY_ADMIN,
    RoleUser.COMPANY_RECRUITER,
  )
  @Post(':companyId/candidates')
  newCandidate(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidateService.create(createCandidateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    RoleUser.SUDO_ADMIN,
    RoleUser.COMPANY_ADMIN,
    RoleUser.COMPANY_RECRUITER,
  )
  @UseGuards(JwtAuthGuard)
  @Get(':companyId/candidates/:candidateId')
  getCandidateByIdScopedByCompany(
    @Param('candidateId') candidateId: string,
    @Param('companyId') companyId: string,
  ) {
    return this.candidateService.findOneScopedByCompany(companyId, candidateId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    RoleUser.SUDO_ADMIN,
    RoleUser.COMPANY_ADMIN,
    RoleUser.COMPANY_RECRUITER,
  )
  @UseGuards(JwtAuthGuard)
  @Get(':companyId/candidates')
  getCandidatesScopedByCompany(@Param('companyId') companyId: string) {
    return this.candidateService.getAllScopedByCompany(companyId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    RoleUser.SUDO_ADMIN,
    RoleUser.COMPANY_ADMIN,
    RoleUser.COMPANY_RECRUITER,
  )
  @Put(':companyId/candidates/:candidateId')
  putCandidate(
    @Param('id') candidateId: string,
    @Body() putCandidateDto: PutCandidateDto,
  ) {
    return this.candidateService.updateOne(candidateId, putCandidateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    RoleUser.SUDO_ADMIN,
    RoleUser.COMPANY_ADMIN,
    RoleUser.COMPANY_RECRUITER,
  )
  @Patch(':companyId/candidates/:candidateId')
  patchCandidate(
    @Param('candidateId') candidateId: string,
    @Body() patchCandidateDto: PatchCandidateDto,
  ) {
    return this.candidateService.patchOne(candidateId, patchCandidateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    RoleUser.SUDO_ADMIN,
    RoleUser.COMPANY_ADMIN,
    RoleUser.COMPANY_RECRUITER,
  )
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':companyId/candidates/candidateId')
  removeCandidate(@Param('candidateId') candidateId: string) {
    return this.candidateService.removeOne(candidateId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.COMPANY_ADMIN, RoleUser.COMPANY_RECRUITER)
  @Post(':companyId/candidates/:candidateId/accept')
  acceptCandidateToStartProcess(
    @Param('companyId') companyId: string,
    @Param('candidateId') candidateId: string,
  ) {
    return this.companyCandidateService.acceptCandidateToStartRecruitment(
      candidateId,
      companyId,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.COMPANY_ADMIN, RoleUser.COMPANY_RECRUITER)
  @Post(':companyId/candidates/:candidateId/notify')
  notifyTheStatusOfCandidateProcess(@Param('candidateId') candidateId: string) {
    return this.companyCandidateService.notifyStatus(candidateId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.COMPANY_ADMIN, RoleUser.COMPANY_RECRUITER)
  @Post(':companyId/candidates/:candidateId/levelup')
  levelUpStageOfCandidate(@Param('candidateId') candidateId: string) {
    return this.companyCandidateService.levelUpCandidate(candidateId);
  }
}
