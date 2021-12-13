import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateStageDto } from '../dto/stage/create-stage.dto';
import { StageService } from '../services/stage.service';

@Controller('companies')
export class CompanyStageController {
  constructor(private readonly stageService: StageService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post(':companyId/stages')
  newStage(
    @Param('companyId') companyId: string,
    @Body() createStageDto: CreateStageDto,
  ) {
    return this.stageService.create(companyId, createStageDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':companyId/stages/:stageId')
  removeStage(@Param('stageId') stageId: string) {
    return this.stageService.removeOne(stageId);
  }
}
