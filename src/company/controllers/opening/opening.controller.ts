import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Roles } from '../../../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { RoleUser } from '../../../users/enum/roles.enums';
import { OpeningService } from '../../services/opening.service';

@Controller('openings')
export class OpeningController {
  constructor(private readonly openingService: OpeningService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN)
  @Get()
  getOpenings() {
    return this.openingService.getAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN)
  @Get('/:openingId')
  getOpeningById(@Param('openingId') openingId: string) {
    return this.openingService.findOne(openingId);
  }
}
