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
import { CreateOpeningDto } from '../dto/opening/create-opening.dto';
import { PutOpeningDto } from '../dto/opening/put-opening.dto';
import { OpeningService } from '../services/opening.service';

@Controller('openings')
export class OpeningController {
  constructor(private readonly openingService: OpeningService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    RoleUser.SUDO_ADMIN,
    RoleUser.COMPANY_ADMIN,
    RoleUser.COMPANY_RECRUITER,
  )
  @Post()
  newOpening(@Body() createOpeningDto: CreateOpeningDto) {
    return this.openingService.create(createOpeningDto);
  }

  @Get()
  getOpenings() {
    return this.openingService.getAll();
  }

  @Get(':id')
  getOpeningById(@Param('id') openingId: string) {
    return this.openingService.findOne(openingId);
  }

  @Put(':id')
  updateOpening(
    @Param('id') id: string,
    @Body() patchOpeningDto: PutOpeningDto,
  ) {
    return this.openingService.updateOne(id, patchOpeningDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  removeOpening(@Param('id') id: string) {
    return this.openingService.removeOne(id);
  }
}
