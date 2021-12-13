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

@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  newCandidate(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidateService.create(createCandidateDto);
  }

  // permissions sudo, per company
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getCandidateById(@Param('id') candidateId: string) {
    return this.candidateService.findOne(candidateId);
  }

  // TODO: should be per company
  @UseGuards(JwtAuthGuard)
  @Get()
  getCandidates() {
    return this.candidateService.getAll();
  }
  // end

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  putCandidate(
    @Param('id') candidateId: string,
    @Body() putCandidateDto: PutCandidateDto,
  ) {
    return this.candidateService.updateOne(candidateId, putCandidateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  patchCandidate(
    @Param('id') candidateId: string,
    @Body() patchCandidateDto: PatchCandidateDto,
  ) {
    return this.candidateService.patchOne(candidateId, patchCandidateDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  removeCandidate(@Param('id') candidateId: string) {
    return this.candidateService.removeOne(candidateId);
  }
}
