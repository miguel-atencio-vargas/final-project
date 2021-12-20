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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { RoleUser } from '../../../users/enum/roles.enums';
import { CreateOpeningDto } from '../../dto/opening/create-opening.dto';
import { PutOpeningDto } from '../../dto/opening/put-opening.dto';
import { OpeningService } from '../../services/opening.service';

@ApiTags('companies')
@Controller('companies')
export class CompanyOpeningController {
  constructor(private readonly openingService: OpeningService) {}

  @ApiOperation({ summary: 'Creates a new Opening' })
  @ApiResponse({
    status: 201,
    description: 'New opening created',
    type: CreateOpeningDto,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN, RoleUser.COMPANY_ADMIN)
  @Post(':companyId/openings')
  newOpening(
    @Param('companyId') companyId: string,
    @Body() createOpeningDto: CreateOpeningDto,
  ) {
    return this.openingService.create(companyId, createOpeningDto);
  }

  @ApiOperation({ summary: 'Returns all openings by Company' })
  @ApiResponse({
    status: 200,
    description: 'List of openings found',
  })
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

  @ApiOperation({ summary: 'Return an specified opening by Company' })
  @ApiResponse({
    status: 200,
    description: 'Opening found',
  })
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

  @ApiOperation({ summary: 'Updates an specified opening' })
  @ApiResponse({
    status: 201,
    description: 'Opening has been updated',
    type: PutOpeningDto,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN, RoleUser.COMPANY_ADMIN)
  @Put(':companyId/openings/:openingId')
  async updateOpening(
    @Param('openingId') openingId: string,
    @Param('companyId') companyId: string,
    @Body() patchOpeningDto: PutOpeningDto,
  ) {
    await this.openingService.findOneOnACompany(openingId, companyId);
    return this.openingService.updateOne(openingId, patchOpeningDto);
  }

  @ApiOperation({ summary: 'Deletes an opening' })
  @ApiResponse({
    status: 200,
    description: 'Opening has been deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':companyId/openings/:openingId')
  async removeOpening(
    @Param('companyId') companyId: string,
    @Param('openingId') openingId: string,
  ) {
    await this.openingService.findOneOnACompany(openingId, companyId);
    return this.openingService.removeOne(openingId);
  }
}
