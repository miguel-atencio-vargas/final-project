import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Roles } from '../../../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { RoleUser } from '../../../users/enum/roles.enums';
import { StageService } from '../../services/stage.service';

@Controller('stages')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN)
  @Get()
  getStages() {
    return this.stageService.getAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN)
  @Get(':stageId')
  getStageById(@Param('stageId') stageId: string) {
    return this.stageService.findOne(stageId);
  }
}
