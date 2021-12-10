import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOpeningDto } from '../dto/opening/create-opening.dto';
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
}
