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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OpeningService } from '../../company/services/opening.service';
import { CandidateState } from '../enum/candidate-state.enum';

@ApiResponse({
  status: 403,
  description: 'Forbidden',
})
@ApiTags('companies')
@Controller('companies')
export class CompanyCandidateController {
  constructor(
    private readonly candidateService: CandidateService,
    private readonly companyCandidateService: CompanyCandidateService,
    private readonly openingService: OpeningService,
  ) {}

  @ApiOperation({ summary: 'Creates a new Candidate' })
  @ApiResponse({
    status: 200,
    description: 'New candidate created',
    type: CreateCandidateDto,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    RoleUser.SUDO_ADMIN,
    RoleUser.COMPANY_ADMIN,
    RoleUser.COMPANY_RECRUITER,
  )
  @Post(':companyId/candidates')
  async newCandidate(
    @Body() createCandidateDto: CreateCandidateDto,
    @Param('companyId') companyId: string,
  ) {
    const opening = await this.openingService.findOneOnACompany(
      createCandidateDto.openingId,
      companyId,
    );
    createCandidateDto.openingId = opening._id;
    createCandidateDto.stageId = CandidateState.AWAITING;
    return this.candidateService.create(createCandidateDto);
  }
  @ApiOperation({ summary: 'Get candiadate by Id' })
  @ApiParam({
    name: 'candidateId',
    description: 'Id for a candidate saved in the DB',
  })
  @ApiParam({
    name: 'companyId',
    description: 'Id for a company saved in the DB',
  })
  @ApiResponse({
    status: 200,
    description: 'Retrieve a candidate searched by a provided id',
  })
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

  @ApiOperation({ summary: 'Return candidates by Company Scope' })
  @ApiResponse({
    status: 200,
    description: 'List of candidates found',
  })
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

  @ApiOperation({ summary: 'Updates a candidate from the DB' })
  @ApiResponse({
    status: 201,
    description: 'Candidate has been updated',
    type: PutCandidateDto,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    RoleUser.SUDO_ADMIN,
    RoleUser.COMPANY_ADMIN,
    RoleUser.COMPANY_RECRUITER,
  )
  @Put(':companyId/candidates/:candidateId')
  async putCandidate(
    @Param('candidateId') candidateId: string,
    @Param('companyId') companyId: string,
    @Body() putCandidateDto: PutCandidateDto,
  ) {
    await this.candidateService.findOneScopedByCompany(companyId, candidateId);
    return this.candidateService.updateOne(candidateId, putCandidateDto);
  }

  @ApiOperation({ summary: 'Updates a candidate from the DB' })
  @ApiResponse({
    status: 204,
    description: 'Candidate has been updatedd',
    type: PatchCandidateDto,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    RoleUser.SUDO_ADMIN,
    RoleUser.COMPANY_ADMIN,
    RoleUser.COMPANY_RECRUITER,
  )
  @Patch(':companyId/candidates/:candidateId')
  async patchCandidate(
    @Param('candidateId') candidateId: string,
    @Param('companyId') companyId: string,
    @Body() patchCandidateDto: PatchCandidateDto,
  ) {
    await this.candidateService.findOneScopedByCompany(companyId, candidateId);
    return this.candidateService.patchOne(candidateId, patchCandidateDto);
  }

  @ApiOperation({ summary: 'Deletes a candidate from the DB' })
  @ApiResponse({
    status: 204,
    description: 'Candidate has been deleted',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    RoleUser.SUDO_ADMIN,
    RoleUser.COMPANY_ADMIN,
    RoleUser.COMPANY_RECRUITER,
  )
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':companyId/candidates/:candidateId')
  async removeCandidate(
    @Param('candidateId') candidateId: string,
    @Param('companyId') companyId: string,
  ) {
    await this.candidateService.findOneScopedByCompany(companyId, candidateId);
    return this.candidateService.removeOne(candidateId);
  }

  @ApiOperation({ summary: 'Set the status of a candidate as accepted' })
  @ApiResponse({
    status: 200,
    description: 'Candidate has been accepted',
  })
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
  @ApiOperation({ summary: 'Sent the status of a candidate by email' })
  @ApiResponse({
    status: 200,
    description: 'Email sent to candidate',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.COMPANY_ADMIN, RoleUser.COMPANY_RECRUITER)
  @Post(':companyId/candidates/:candidateId/notify')
  notifyTheStatusOfCandidateProcess(@Param('candidateId') candidateId: string) {
    return this.companyCandidateService.notifyStatus(candidateId);
  }

  @ApiOperation({ summary: 'Level up the current stage for a candidate' })
  @ApiResponse({
    status: 200,
    description: 'Candidate stage updated',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.COMPANY_ADMIN, RoleUser.COMPANY_RECRUITER)
  @Post(':companyId/candidates/:candidateId/levelup')
  levelUpStageOfCandidate(@Param('candidateId') candidateId: string) {
    return this.companyCandidateService.levelUpCandidate(candidateId);
  }
  @ApiOperation({ summary: 'Set the status of a candidate as rejected' })
  @ApiResponse({
    status: 200,
    description: 'Candidate status updated as rejected',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.COMPANY_ADMIN, RoleUser.COMPANY_RECRUITER)
  @Post(':companyId/candidates/:candidateId/reject')
  rejectCandidate(@Param('candidateId') candidateId: string) {
    return this.companyCandidateService.rejectCandidate(candidateId);
  }

  @ApiOperation({ summary: 'Get the status of a candidate' })
  @ApiResponse({
    status: 200,
    description: 'Retrieve a candidate with his current status',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.COMPANY_ADMIN, RoleUser.COMPANY_RECRUITER)
  @Get(':companyId/candidates/:candidateId/status')
  getCandidateStatus(
    @Param('candidateId') candidateId: string,
    @Param('companyId') companyId: string,
  ) {
    return this.companyCandidateService.getStatus(candidateId, companyId);
  }
}
