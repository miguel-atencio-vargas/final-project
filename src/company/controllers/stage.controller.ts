import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { PutStageDto } from '../dto/stage/update-stage.dto';
import { StageService } from '../services/stage.service';

@Controller('stage')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Get(':id')
  getStageById(@Param('id') stageId: string) {
    return this.stageService.findOne(stageId);
  }

  @Get()
  getStages() {
    return this.stageService.getAll();
  }

  @Put(':id')
  updateStage(@Param('id') id: string, @Body() pathStageDto: PutStageDto) {
    return this.stageService.updateOne(id, pathStageDto);
  }
}
