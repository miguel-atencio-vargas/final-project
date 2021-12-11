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
import { CreateOpeningDto } from '../dto/opening/create-opening.dto';
import { PutOpeningDto } from '../dto/opening/put-opening.dto';
import { OpeningService } from '../services/opening.service';

@Controller('openings')
export class OpeningController {
  constructor(private readonly openingService: OpeningService) {}

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
