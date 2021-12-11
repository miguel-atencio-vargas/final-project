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
} from '@nestjs/common';
import { CreateStageDto } from './dto/create-stage.dto';
import { PutStageDto } from './dto/update-stage.dto';
import { StageService } from './stage.service';

@Controller('stage')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Post()
  newStage(@Body() createStageDto: CreateStageDto) {
    return this.stageService.create(createStageDto);
  }

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

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  removeStage(@Param('id') id: string) {
    return this.stageService.removeOne(id);
  }
}
