import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { RoleUser } from '../../../users/enum/roles.enums';
import { OpeningService } from '../../services/opening.service';

@ApiTags('openings')
@Controller('openings')
export class OpeningController {
  constructor(private readonly openingService: OpeningService) {}

  @ApiOperation({ summary: 'Return all openings' })
  @ApiResponse({
    status: 200,
    description: 'List all openings',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN)
  @Get()
  getOpenings() {
    return this.openingService.getAll();
  }

  @ApiOperation({ summary: 'Return an opening by Id.' })
  @ApiResponse({
    status: 200,
    description: 'Show an opening found by Id',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN)
  @Get('/:openingId')
  getOpeningById(@Param('openingId') openingId: string) {
    return this.openingService.findOne(openingId);
  }
}
