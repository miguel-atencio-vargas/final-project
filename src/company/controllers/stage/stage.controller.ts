import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { RoleUser } from '../../../users/enum/roles.enums';
import { StageService } from '../../services/stage.service';

@ApiTags('stages')
@Controller('stages')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @ApiOperation({ summary: 'Returns all stages' })
  @ApiResponse({
    status: 200,
    description: 'All stages found',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN)
  @Get()
  getStages() {
    return this.stageService.getAll();
  }

  @ApiOperation({ summary: 'Returns an stage searched by Id' })
  @ApiResponse({
    status: 200,
    description: 'All stages found',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN)
  @Get(':stageId')
  getStageById(@Param('stageId') stageId: string) {
    return this.stageService.findOne(stageId);
  }
}
