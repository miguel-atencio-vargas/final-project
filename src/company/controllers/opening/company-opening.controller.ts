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
import { Roles } from '../../../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { RoleUser } from '../../../users/enum/roles.enums';
import { CreateOpeningDto } from '../../dto/opening/create-opening.dto';
import { PutOpeningDto } from '../../dto/opening/put-opening.dto';
import { OpeningService } from '../../services/opening.service';

@Controller('companies')
export class CompanyOpeningController {
  constructor(private readonly openingService: OpeningService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN, RoleUser.COMPANY_ADMIN)
  @Post(':companyId/openings')
  newOpening(
    @Param('companyId') companyId: string,
    @Body() createOpeningDto: CreateOpeningDto,
  ) {
    return this.openingService.create(companyId, createOpeningDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    RoleUser.SUDO_ADMIN,
    RoleUser.COMPANY_ADMIN,
    RoleUser.COMPANY_RECRUITER,
  )
  @Get(':companyId/openings')
  getOpeningsByCompany(@Param('companyId') companyId: string) {
    return this.openingService.getAllByCompany(companyId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    RoleUser.SUDO_ADMIN,
    RoleUser.COMPANY_ADMIN,
    RoleUser.COMPANY_RECRUITER,
  )
  @Get(':companyId/openings/:openingId')
  getOpeningByIdScopedByCompany(
    @Param('openingId') openingId: string,
    @Param('companyId') companyId: string,
  ) {
    return this.openingService.findOneOnACompany(openingId, companyId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN, RoleUser.COMPANY_ADMIN)
  @Put(':openingId/companies/:companyId')
  updateOpening(
    @Param('openingId') openingId: string,
    @Body() patchOpeningDto: PutOpeningDto,
  ) {
    return this.openingService.updateOne(openingId, patchOpeningDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':openingId/companies/:companyId')
  removeOpening(@Param('companyId') companyId: string) {
    return this.openingService.removeOne(companyId);
  }
}
