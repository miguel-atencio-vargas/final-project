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
import { Roles } from '../../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { RoleUser } from '../../users/enum/roles.enums';
import { CreateStageDto } from '../dto/stage/create-stage.dto';
import { PutStageDto } from '../dto/stage/update-stage.dto';
import { StageService } from '../services/stage.service';

@Controller('companies')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN, RoleUser.COMPANY_ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post(':companyId/stages')
  newStage(
    @Param('companyId') companyId: string,
    @Body() createStageDto: CreateStageDto,
  ) {
    return this.stageService.create(companyId, createStageDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    RoleUser.SUDO_ADMIN,
    RoleUser.COMPANY_ADMIN,
    RoleUser.COMPANY_RECRUITER,
  )
  @Get(':companyId/stages/:stageId')
  getStageById(@Param('stageId') stageId: string) {
    return this.stageService.findOne(stageId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    RoleUser.SUDO_ADMIN,
    RoleUser.COMPANY_ADMIN,
    RoleUser.COMPANY_RECRUITER,
  )
  @Get(':companyId/stages')
  getStages() {
    return this.stageService.getAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN, RoleUser.COMPANY_ADMIN)
  @Put(':companyId/stages:/stageId')
  updateStage(
    @Param('stageId') stageId: string,
    @Body() putStageDto: PutStageDto,
  ) {
    return this.stageService.updateOne(stageId, putStageDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN, RoleUser.COMPANY_ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':companyId/stages/:stageId')
  removeStage(@Param('stageId') stageId: string) {
    return this.stageService.removeOne(stageId);
  }
}
