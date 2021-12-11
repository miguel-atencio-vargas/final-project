import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { PutCandidateDto } from './dto/put-candidate.dto';

@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  newCandidate(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidateService.create(createCandidateDto);
  }

  @Get(':id')
  getCandidateById(@Param('id') candidateId: string) {
    return this.candidateService.findOne(candidateId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getCandidates() {
    return this.candidateService.getAll();
  }

  @Put(':id')
  updateCandidate(
    @Param('id') candidateId: string,
    @Body() putCandidateDto: PutCandidateDto,
  ) {
    return this.candidateService.updateOne(candidateId, putCandidateDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  removeCandidate(@Param('id') candidateId: string) {
    return this.candidateService.removeOne(candidateId);
  }
}
